import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does it take?",
    a: "Usually 6–10 hours. Basic clean can be faster.",
  },
  {
    q: "What can I get cleaned?",
    a: "Shoes, slippers, sandals, formals, boots, kids footwear — almost any pair.",
  },
  {
    q: "Do you pick up from home?",
    a: "Yes. Doorstep pickup and delivery.",
  },
  {
    q: "When do I pay?",
    a: "After cleaning is done. No advance payment needed.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          FAQ
        </h2>
        <p className="mt-2 text-muted-foreground">Short answers.</p>
        <Accordion className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
