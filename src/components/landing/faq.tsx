import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does cleaning take?",
    a: "6–10 hours for most pairs — not the usual 24–48 hours. Basic can be ready in about 6 hours.",
  },
  {
    q: "What are your prices?",
    a: "Basic ₹299 · Deep ₹399 · Premium/Leather ₹599. Pay after cleaning is done.",
  },
  {
    q: "What do you clean?",
    a: "Shoes, slippers, sandals, flip-flops, formals, boots, kids footwear — almost everything.",
  },
  {
    q: "Do you pickup from home?",
    a: "Yes. Doorstep pickup and delivery across our service areas.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          FAQ
        </h2>
        <p className="mt-2 text-muted-foreground">
          Speed, price, and pickup — answered simply.
        </p>
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
