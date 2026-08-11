import { useState } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
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
import { isAdmin, isHod, useSession } from "@/lib/auth";
import {
  EVENT_TYPES,
  uid,
  useCalendar,
  type CalendarEvent,
  type EventType,
} from "@/lib/campus-store";
import { DEPARTMENTS } from "@/lib/mock-college";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export function CalendarPage() {
  const { session } = useSession();
  const [events, setEvents] = useCalendar();
  const canEdit = isAdmin(session) || isHod(session);

  const visible = events
    .filter(
      (e) =>
        e.department === "All departments" ||
        !session ||
        session.role === "College Admin" ||
        e.department === session.department,
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <CalendarDays className="size-5 text-accent" /> Academic calendar
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {canEdit
                ? "Publish and edit semester dates, examinations, holidays and deadlines."
                : "Semester dates, examinations, holidays and deadlines — read-only."}
            </p>
          </div>
          {canEdit && (
            <EventDialog
              defaultDepartment={isHod(session) ? session!.department : "All departments"}
              author={session!.name}
              onSave={(e) => {
                setEvents((prev) => [...prev.filter((x) => x.id !== e.id), e]);
                toast.success("Academic calendar updated");
              }}
            />
          )}
        </div>
      </Panel>

      <div className="space-y-3">
        {visible.map((e) => (
          <Panel key={e.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-24 shrink-0 rounded-2xl bg-secondary px-3 py-2 text-center">
                  <p className="text-xs text-muted-foreground">{fmt(e.date).split(" ")[1]}</p>
                  <p className="text-xl font-semibold">{fmt(e.date).split(" ")[0]}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{e.title}</h2>
                    <Badge variant="secondary">{e.type}</Badge>
                    {e.department !== "All departments" && (
                      <Badge variant="outline">{e.department}</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {fmt(e.date)}
                    {e.endDate ? ` — ${fmt(e.endDate)}` : ""} · added by {e.createdBy}
                  </p>
                </div>
              </div>
              {canEdit && (
                <div className="flex gap-1">
                  <EventDialog
                    existing={e}
                    defaultDepartment={e.department}
                    author={session!.name}
                    onSave={(updated) => {
                      setEvents((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
                      toast.success("Entry updated");
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEvents((prev) => prev.filter((x) => x.id !== e.id));
                      toast.success("Entry removed");
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function EventDialog({
  existing,
  defaultDepartment,
  author,
  onSave,
}: {
  existing?: CalendarEvent;
  defaultDepartment: string;
  author: string;
  onSave: (e: CalendarEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [date, setDate] = useState(existing?.date ?? "");
  const [endDate, setEndDate] = useState(existing?.endDate ?? "");
  const [type, setType] = useState<EventType>(existing?.type ?? "Event");
  const [department, setDepartment] = useState(existing?.department ?? defaultDepartment);
  const [description, setDescription] = useState(existing?.description ?? "");

  const submit = () => {
    if (!title.trim() || !date) {
      toast.error("Title and date are required");
      return;
    }
    onSave({
      id: existing?.id ?? uid(),
      title: title.trim(),
      date,
      ...(endDate ? { endDate } : {}),
      type,
      department,
      description: description.trim(),
      createdBy: author,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {existing ? (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        ) : (
          <Button size="sm">
            <Plus className="size-4" /> Add entry
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existing ? "Edit calendar entry" : "Add calendar entry"}</DialogTitle>
          <DialogDescription>
            Students see this instantly — they can read but not edit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="c-title">Title</Label>
            <Input
              id="c-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mid-semester examinations"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="c-date">Start date</Label>
              <Input
                id="c-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-end">End date (optional)</Label>
              <Input
                id="c-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as EventType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Applies to</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All departments">All departments</SelectItem>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d.id} value={d.name}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-desc">Description</Label>
            <Textarea
              id="c-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>{existing ? "Save changes" : "Add to calendar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
