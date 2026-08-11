import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  IdCard,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchConnector } from "./branch-connector";

const NODES = [
  { icon: Newspaper, label: "CampusConnect" },
  { icon: GraduationCap, label: "GradeMate" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          One Platform. Every Campus Product.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mt-6 text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl"
        >
          Power Every Campus Application <span className="text-gradient">From One Place</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Register your college once and get a CampusGrid ID. Manage students, professors,
          departments, roles and permissions here — CampusConnect and GradeMate pick the data up
          automatically. Never enter it twice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="shadow-soft">
            <Link to="/register">
              Get Started <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#products">Explore Products</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <IdCard className="size-3.5" /> One CampusGrid ID
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" /> Central user management
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Enterprise-grade security
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="size-3.5" /> 30-day free trial — no advance payment
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.34 }}
        className="relative mx-auto mt-16 max-w-4xl"
      >
        <div className="glass-panel rounded-3xl p-6 shadow-lift sm:p-10">
          <div className="flex flex-col items-center gap-4">
            <NodeCard
              icon={Building2}
              title="Your College"
              sub="Registered once — issued a CampusGrid ID"
              wide
            />
            <Connector />
            <div
              className="w-full rounded-2xl px-6 py-5 text-center text-primary-foreground shadow-soft"
              style={{ background: "var(--gradient-hero)" }}
            >
              <p className="text-sm font-semibold tracking-wide uppercase opacity-80">
                CampusGrid Core
              </p>
              <p className="mt-1.5 text-sm opacity-90">
                Authentication · Users · Departments · Roles · Permissions · Subscriptions
              </p>
            </div>
            <BranchConnector count={2} />
            <div className="grid w-full gap-3 sm:grid-cols-2">
              {NODES.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.09 }}
                >
                  <NodeCard icon={n.icon} title={n.label} sub="Linked with your CampusGrid ID" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Connector() {
  return (
    <div className="relative h-8 w-px bg-border">
      <motion.span
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function NodeCard({
  icon: Icon,
  title,
  sub,
  wide,
}: {
  icon: typeof Building2;
  title: string;
  sub: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft ${wide ? "w-full justify-center" : "w-full"}`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-4.5" />
      </span>
      <span className="text-left">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
    </div>
  );
}
