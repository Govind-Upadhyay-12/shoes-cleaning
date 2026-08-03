const steps = [
  {
    n: "1",
    title: "Tell us about your pair",
    text: "Photos + type + dirt level. Instant price.",
  },
  {
    n: "2",
    title: "We pick up",
    text: "Doorstep pickup at your chosen time.",
  },
  {
    n: "3",
    title: "Back in 6–10 hours",
    text: "Cleaned, checked, and delivered. Pay after.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        How it works
      </h2>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Three simple steps. No confusion.
      </p>

      <ol className="mt-10 grid gap-8 sm:grid-cols-3">
        {steps.map((step) => (
          <li key={step.n}>
            <p className="text-sm font-semibold text-primary">{step.n}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
