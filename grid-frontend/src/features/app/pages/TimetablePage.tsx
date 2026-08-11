import { useMemo, useState } from "react";
import { CalendarClock, Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useSession, isAdmin, isHod } from "@/lib/auth";
import {
  DAYS,
  DEFAULT_SLOTS,
  slotKey,
  slotLabel,
  slotStart,
  uid,
  useSlotSets,
  useTimetable,
  type Day,
  type Lecture,
  type TimeSlot,
} from "@/lib/campus-store";
import { BATCHES, DEPARTMENTS, yearLabel, yearOfBatch } from "@/lib/mock-college";

export function TimetablePage() {
  const { session } = useSession();
  const [lectures, setLectures] = useTimetable();
  const [slotSets, setSlotSets] = useSlotSets();
  const canEdit = isHod(session) || isAdmin(session);

  /* Students are locked to their own branch and year; professors to their branch. */
  const lockedDepartment = session ? session.role !== "College Admin" : true;
  const lockedBatch = session?.role === "Student";

  const [department, setDepartment] = useState(
    session && session.department !== "Administration" ? session.department : DEPARTMENTS[0]!.name,
  );
  const [batch, setBatch] = useState(String(session?.batch ?? BATCHES[0]));

  const activeDept = lockedDepartment && session ? session.department : department;
  const activeBatch = lockedBatch ? String(session!.batch) : batch;
  const key = slotKey(activeDept, activeBatch);

  const slots = useMemo(
    () => [...(slotSets[key] ?? DEFAULT_SLOTS)].sort((a, b) => slotStart(a) - slotStart(b)),
    [slotSets, key],
  );

  const setSlots = (next: TimeSlot[]) => setSlotSets((prev) => ({ ...prev, [key]: next }));

  const grid = useMemo(() => {
    const map = new Map<string, Lecture>();
    lectures
      .filter((l) => l.department === activeDept && String(l.batch) === activeBatch)
      .forEach((l) => map.set(`${l.day}|${l.slot}`, l));
    return map;
  }, [lectures, activeDept, activeBatch]);

  const addLecture = (l: Lecture) => {
    setLectures((prev) => [
      ...prev.filter(
        (x) =>
          !(
            x.day === l.day &&
            x.slot === l.slot &&
            x.department === l.department &&
            x.batch === l.batch
          ),
      ),
      l,
    ]);
    toast.success("Lecture added to the time-table");
  };

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <CalendarClock className="size-5 text-accent" /> Time-table
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {canEdit
                ? "Define your own periods, then fill the empty cells. Professors and students of the department see it instantly."
                : session?.role === "Student"
                  ? "The weekly schedule published by your Head of Department for your branch and year."
                  : "The weekly schedule published by the Head of Department."}
            </p>
          </div>
          {canEdit && (
            <div className="flex gap-2">
              <SlotsDialog slots={slots} onSave={setSlots} />
              <AddLectureDialog
                department={activeDept}
                batch={Number(activeBatch)}
                slots={slots}
                onAdd={addLecture}
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {!lockedDepartment && (
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {!lockedBatch && (
            <Select value={batch} onValueChange={setBatch}>
              <SelectTrigger className="w-56">
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
          )}
          <Badge variant="secondary" className="self-center">
            {activeDept} · Batch {activeBatch} · {yearLabel(yearOfBatch(Number(activeBatch)))}
          </Badge>
        </div>
      </Panel>

      <Panel className="overflow-x-auto p-4 sm:p-6">
        {slots.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No periods defined yet.{" "}
            {canEdit
              ? "Use “Time slots” to add the first one."
              : "Your HoD has not published the schedule."}
          </p>
        ) : (
          <div className="min-w-[880px]">
            <div className="grid grid-cols-[130px_repeat(6,1fr)] gap-2">
              <div />
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="rounded-xl bg-secondary px-3 py-2 text-center text-xs font-semibold"
                >
                  {d.slice(0, 3)}
                </div>
              ))}
              {slots.map((s) => {
                const label = slotLabel(s);
                return (
                  <div key={s.id} className="contents">
                    <div className="flex items-center rounded-xl bg-secondary px-3 py-2 text-[11px] font-medium text-muted-foreground">
                      {label}
                    </div>
                    {DAYS.map((day) => {
                      const l = grid.get(`${day}|${label}`);
                      return (
                        <div
                          key={day + label}
                          className={`min-h-20 rounded-xl border p-2.5 text-xs transition-colors ${
                            l ? "border-primary/20 bg-primary/5" : "border-dashed border-border"
                          }`}
                        >
                          {l ? (
                            <div className="group relative h-full">
                              <p className="font-semibold text-foreground">{l.subject}</p>
                              <p className="mt-1 text-muted-foreground">{l.faculty}</p>
                              <p className="text-muted-foreground">{l.room}</p>
                              {canEdit && (
                                <button
                                  onClick={() => {
                                    setLectures((prev) => prev.filter((x) => x.id !== l.id));
                                    toast.success("Lecture removed");
                                  }}
                                  className="absolute top-0 right-0 hidden text-muted-foreground group-hover:block"
                                  aria-label="Remove lecture"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              )}
                            </div>
                          ) : canEdit ? (
                            <AddLectureDialog
                              department={activeDept}
                              batch={Number(activeBatch)}
                              slots={slots}
                              defaultDay={day}
                              defaultSlot={label}
                              onAdd={addLecture}
                              trigger={
                                <button
                                  className="flex size-full items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
                                  aria-label={`Add lecture on ${day} at ${label}`}
                                >
                                  <Plus className="size-4" />
                                </button>
                              }
                            />
                          ) : (
                            <span className="text-muted-foreground/60">—</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Panel>
    </div>
  );
}

/* --------------------------- Slot editor -------------------------- */

function SlotsDialog({ slots, onSave }: { slots: TimeSlot[]; onSave: (s: TimeSlot[]) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<TimeSlot[]>(slots);
  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("10:00");

  const openChange = (o: boolean) => {
    if (o) setDraft(slots);
    setOpen(o);
  };

  const add = () => {
    if (!from || !to || from >= to) {
      toast.error("The “to” time must be later than the “from” time");
      return;
    }
    setDraft((prev) =>
      [...prev, { id: uid(), from, to }].sort((a, b) => slotStart(a) - slotStart(b)),
    );
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Clock className="size-4" /> Time slots
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Define the periods</DialogTitle>
          <DialogDescription>
            Choose a “from” and “to” time for every period. The time-table grid is built from these
            slots for this branch and batch.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-end gap-3">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="slot-from">From</Label>
              <Input
                id="slot-from"
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="slot-to">To</Label>
              <Input id="slot-to" type="time" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <Button variant="outline" onClick={add}>
              <Plus className="size-4" /> Add
            </Button>
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto">
            {draft.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No periods yet.
              </p>
            )}
            {draft.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-2.5"
              >
                <span className="text-sm">
                  <span className="text-muted-foreground">Period {i + 1}</span> · {slotLabel(s)}
                </span>
                <button
                  onClick={() => setDraft((prev) => prev.filter((x) => x.id !== s.id))}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${slotLabel(s)}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onSave(draft);
              setOpen(false);
              toast.success("Time slots updated");
            }}
          >
            Save slots
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------- Lecture editor ------------------------ */

function AddLectureDialog({
  department,
  batch,
  slots,
  defaultDay,
  defaultSlot,
  trigger,
  onAdd,
}: {
  department: string;
  batch: number;
  slots: TimeSlot[];
  defaultDay?: Day;
  defaultSlot?: string;
  trigger?: React.ReactNode;
  onAdd: (l: Lecture) => void;
}) {
  const labels = slots.map(slotLabel);
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<Day>(defaultDay ?? DAYS[0]);
  const [slot, setSlot] = useState<string>(defaultSlot ?? labels[0] ?? "");
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [room, setRoom] = useState("");

  const submit = () => {
    if (!subject.trim() || !slot) return;
    onAdd({
      id: uid(),
      department,
      batch,
      day,
      slot,
      subject: subject.trim(),
      faculty: faculty.trim() || "To be assigned",
      room: room.trim() || "—",
    });
    setSubject("");
    setFaculty("");
    setRoom("");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          setDay(defaultDay ?? DAYS[0]);
          setSlot(defaultSlot ?? labels[0] ?? "");
        }
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <Plus className="size-4" /> Add lecture
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a lecture</DialogTitle>
          <DialogDescription>
            {department} · Batch {batch}. Students and professors of this batch see the update
            immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Day</Label>
              <Select value={day} onValueChange={(v) => setDay(v as Day)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Period</Label>
              <Select value={slot} onValueChange={setSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a period" />
                </SelectTrigger>
                <SelectContent>
                  {labels.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tt-sub">Subject</Label>
            <Input
              id="tt-sub"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Operating Systems"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tt-fac">Faculty</Label>
            <Input
              id="tt-fac"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              placeholder="Prof. R. Iyer"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tt-room">Room / lab</Label>
            <Input
              id="tt-room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="A-301"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Add to time-table</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
