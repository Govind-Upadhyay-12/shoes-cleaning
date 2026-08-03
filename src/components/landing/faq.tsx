import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is there a first cleaning offer?",
    a: "Yes — first cleaning is up to 50% off (Basic from ₹149, Deep from ₹199, Premium from ₹299). Same 6–10 hour delivery.",
  },
  {
    q: "How long does cleaning take?",
    a: "6–10 hours for most pairs — not the usual 24–48 hours. Basic can be ready in about 6 hours.",
  },
  {
    q: "What are your prices?",
    a: "Regular: Basic ₹299 · Deep ₹399 · Premium ₹599. First clean: up to 50% off. Pay after cleaning is done.",
  },
  {
    q: "What do you clean?",
    a: "Shoes, slippers, sandals, flip-flops, formals, boots, kids footwear — almost everything.",
  },
  {
    q: "Do you pickup from home?",
    a: "Yes — doorstep pickup and delivery across Bengaluru (pincode 560xxx). We are live in Bengaluru only for now.",
  },
  {
    q: "Which cities do you serve?",
    a: "Plugzzy Clean is currently live in Bengaluru only. Enter a 560xxx pincode to book.",
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
