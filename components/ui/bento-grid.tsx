import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3 px-4",
        className
      )}
      aria-label="Features overview"
    >
      {children}
    </section>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <article
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border-2 border-border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/50",
        className
      )}
    >
      <div className="overflow-hidden rounded-xl">{header}</div>
      <div className="transition-all duration-300 group-hover/bento:translate-x-2">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h3 className="font-sans text-lg font-bold text-foreground">
            {title}
          </h3>
        </div>
        <p className="font-sans text-sm font-normal text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};
