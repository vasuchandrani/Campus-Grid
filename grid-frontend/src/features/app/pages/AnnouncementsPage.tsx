import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Globe2,
  ImagePlus,
  Megaphone,
  MessagesSquare,
  Plus,
  Users2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Panel } from "@/components/common/panel";
import { isAdmin, isFaculty, useSession, type Session } from "@/lib/auth";
import {
  canRead,
  uid,
  useAnnouncements,
  useGroups,
  type Announcement,
  type AnnouncementGroup,
  type Audience,
} from "@/lib/campus-store";
import { BATCHES, DEPARTMENTS, yearLabel, yearOfBatch } from "@/lib/mock-college";

const when = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.round(hrs / 24)} d ago`;
};

export function AnnouncementsPage() {
  const { session } = useSession();
  if (!session) return null;
  return isFaculty(session) || isAdmin(session) ? (
    <FacultyAnnouncements session={session} />
  ) : (
    <StudentFeed session={session} />
  );
}

/* ----------------------------- Student view ---------------------------- */

function StudentFeed({ session }: { session: Session }) {
  const [announcements] = useAnnouncements();
  const [groups] = useGroups();

  const visible = announcements
    .filter((a) => canRead(a, session, groups))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Megaphone className="size-5 text-accent" /> Announcements
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything addressed to you — college-wide notices, {session.department} updates and
          messages for your batch. Announcements are read-only for students.
        </p>
      </Panel>

      <div className="space-y-4">
        {visible.map((a) => (
          <AnnouncementCard key={a.id} a={a} groups={groups} />
        ))}
        {visible.length === 0 && (
          <Panel>
            <p className="text-sm text-muted-foreground">No announcements yet.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}

function AnnouncementCard({
  a,
  groups,
  onDelete,
}: {
  a: Announcement;
  groups: AnnouncementGroup[];
  onDelete?: () => void;
}) {
  const label =
    a.audience.scope === "college"
      ? "College-wide"
      : a.audience.scope === "department"
        ? a.audience.department
        : (groups.find((g) => a.audience.scope === "group" && g.id === a.audience.groupId)?.name ??
          "Group");

  return (
    <Panel className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge variant={a.audience.scope === "college" ? "default" : "secondary"}>{label}</Badge>
          <h2 className="mt-3 text-lg font-semibold">{a.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{when(a.createdAt)}</p>
          {onDelete && (
            <button
              onClick={onDelete}
              aria-label="Delete announcement"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
        {a.body}
      </p>
      {a.images.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {a.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${a.title} attachment ${i + 1}`}
              loading="lazy"
              className="w-full rounded-2xl border border-border object-cover"
            />
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        {a.author} · {a.authorRole}
      </p>
    </Panel>
  );
}

/* --------------------------- Faculty / admin --------------------------- */

function FacultyAnnouncements({ session }: { session: Session }) {
  const [groups, setGroups] = useGroups();
  const [announcements, setAnnouncements] = useAnnouncements();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const myGroups = useMemo(
    () => (isAdmin(session) ? groups : groups.filter((g) => g.department === session.department)),
    [groups, session],
  );

  const active = groups.find((g) => g.id === openGroup) ?? null;

  const publish = (a: Announcement) => {
    setAnnouncements((prev) => [a, ...prev]);
    toast.success("Announcement published", {
      description:
        a.audience.scope === "group"
          ? "Delivered only to that batch — nobody else is notified."
          : a.audience.scope === "department"
            ? "Delivered to the whole department."
            : "Delivered to every student in the college.",
    });
  };

  const remove = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    toast.success("Announcement removed");
  };

  if (active) {
    const thread = announcements
      .filter((a) => a.audience.scope === "group" && a.audience.groupId === active.id)
      .sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt));

    return (
      <div className="space-y-6">
        <Panel>
          <button
            onClick={() => setOpenGroup(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All groups
          </button>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">{active.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Visible only to {active.department} students of batch {active.batch} (
                {yearLabel(yearOfBatch(active.batch))}) and the department faculty.
              </p>
            </div>
            <ComposeDialog
              session={session}
              audience={{ scope: "group", groupId: active.id }}
              trigger={
                <Button size="sm">
                  <Plus className="size-4" /> Create announcement
                </Button>
              }
              onPublish={publish}
            />
          </div>
        </Panel>

        <div className="space-y-4">
          {thread.map((a) => (
            <AnnouncementCard key={a.id} a={a} groups={groups} onDelete={() => remove(a.id)} />
          ))}
          {thread.length === 0 && (
            <Panel>
              <p className="text-sm text-muted-foreground">No announcements in this group yet.</p>
            </Panel>
          )}
        </div>
      </div>
    );
  }

  const broadcasts = announcements
    .filter((a) => a.audience.scope !== "group")
    .sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt));

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <Megaphone className="size-5 text-accent" /> Announcements
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a group to speak to one batch only, or publish a public announcement for the
              whole college.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ComposeDialog
              session={session}
              audience={{ scope: "college" }}
              trigger={
                <Button size="sm" variant="outline">
                  <Globe2 className="size-4" /> Public announcement
                </Button>
              }
              onPublish={publish}
              allowScopeChoice={!isAdmin(session)}
            />
            {!isAdmin(session) && (
              <NewGroupDialog
                session={session}
                onCreate={(g) => {
                  setGroups((prev) => [g, ...prev]);
                  toast.success(`${g.name} created`);
                }}
              />
            )}
          </div>
        </div>
      </Panel>

      {!isAdmin(session) && (
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            <MessagesSquare className="size-4" /> Announcement groups
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((g) => {
              const count = announcements.filter(
                (a) => a.audience.scope === "group" && a.audience.groupId === g.id,
              ).length;
              return (
                <button
                  key={g.id}
                  onClick={() => setOpenGroup(g.id)}
                  className="rounded-3xl border border-border bg-card p-6 text-left shadow-soft transition-shadow hover:shadow-md"
                >
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Users2 className="size-5" />
                  </span>
                  <p className="mt-4 font-semibold">{g.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{g.description}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {count} announcement{count === 1 ? "" : "s"}
                  </p>
                </button>
              );
            })}
            {myGroups.length === 0 && (
              <Panel>
                <p className="text-sm text-muted-foreground">No groups yet — create one.</p>
              </Panel>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Public &amp; department announcements
        </h2>
        <div className="mt-4 space-y-4">
          {broadcasts.map((a) => (
            <AnnouncementCard key={a.id} a={a} groups={groups} onDelete={() => remove(a.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NewGroupDialog({
  session,
  onCreate,
}: {
  session: Session;
  onCreate: (g: AnnouncementGroup) => void;
}) {
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState(String(BATCHES[0]));
  const [description, setDescription] = useState("");

  const dept = DEPARTMENTS.find((d) => d.name === session.department);

  const submit = () => {
    const b = Number(batch);
    onCreate({
      id: uid(),
      name: `${dept?.code ?? session.department} · Batch ${b} (${yearLabel(yearOfBatch(b))})`,
      department: session.department,
      batch: b,
      description: description.trim() || "Batch announcements.",
      createdBy: session.name,
    });
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" /> New group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an announcement group</DialogTitle>
          <DialogDescription>
            A group is scoped to one batch of {session.department}. Only those students receive its
            announcements.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Batch</Label>
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BATCHES.map((b) => (
                  <SelectItem key={b} value={String(b)}>
                    Batch {b} · {yearLabel(yearOfBatch(b))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="g-desc">Purpose</Label>
            <Input
              id="g-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Placement and final-year project updates"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Create group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ComposeDialog({
  session,
  audience,
  trigger,
  onPublish,
  allowScopeChoice,
}: {
  session: Session;
  audience: Audience;
  trigger: React.ReactNode;
  onPublish: (a: Announcement) => void;
  allowScopeChoice?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [scope, setScope] = useState<"college" | "department">("college");

  const pick = (files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .slice(0, 3)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => setImages((prev) => [...prev, String(reader.result)]);
        reader.readAsDataURL(file);
      });
  };

  const submit = () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Add a title and a message");
      return;
    }
    const finalAudience: Audience =
      audience.scope === "group"
        ? audience
        : allowScopeChoice && scope === "department"
          ? { scope: "department", department: session.department }
          : { scope: "college" };
    onPublish({
      id: uid(),
      title: title.trim().slice(0, 120),
      body: body.trim().slice(0, 2000),
      images,
      audience: finalAudience,
      author: session.name,
      authorRole: session.role,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setBody("");
    setImages([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {audience.scope === "group" ? "Announce to this group" : "Public announcement"}
          </DialogTitle>
          <DialogDescription>
            Text is required; images are optional. Students can read announcements but never reply.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {audience.scope !== "group" && allowScopeChoice && (
            <div className="grid gap-2">
              <Label>Audience</Label>
              <Select value={scope} onValueChange={(v) => setScope(v as "college" | "department")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="college">Whole college</SelectItem>
                  <SelectItem value="department">{session.department} only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="a-title">Title</Label>
            <Input
              id="a-title"
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Placement drive — register before Friday"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="a-body">Message</Label>
            <Textarea
              id="a-body"
              rows={6}
              maxLength={2000}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the announcement…"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="a-img" className="flex items-center gap-2">
              <ImagePlus className="size-4" /> Images (optional)
            </Label>
            <Input
              id="a-img"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => pick(e.target.files)}
            />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`Attachment ${i + 1}`}
                      loading="lazy"
                      className="size-20 rounded-xl border border-border object-cover"
                    />
                    <button
                      onClick={() => setImages((prev) => prev.filter((_, x) => x !== i))}
                      className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-foreground text-background"
                      aria-label="Remove image"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
