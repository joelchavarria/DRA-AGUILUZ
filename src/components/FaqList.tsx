"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/config/site";
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Accordion type="single" collapsible className="faq-list">
      {items.map((item, index) => (
        <AccordionItem value={`faq-${index}`} key={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
