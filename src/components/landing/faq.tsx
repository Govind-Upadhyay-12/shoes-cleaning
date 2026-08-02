import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does cleaning take?",
    a: "8–10 hours for most footwear. Basic can be faster.",
  },
  {
    q: "What do you clean?",
    a: "Shoes, slippers, sandals, flip-flops, formals, boots, kids footwear — everything.",
  },
  {
    q: "Do you pickup from home?",
    a: "Yes. Doorstep pickup and delivery.",
  },
  {
    q: "White shoes & slippers?",
    a: "Yes — including sole whitening and stain care.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">FAQ</h2>
        <p className="mt-2 text-muted-foreground">Quick answers before you book.</p>
      </div>
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
    </section>
  );
}
