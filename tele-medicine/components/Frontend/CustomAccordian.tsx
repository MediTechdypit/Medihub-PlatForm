import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JSX } from "react/jsx-runtime";


export type FAQ = {
  qn: string;
  ans: string | JSX.Element;
};


export default function CustomAccordion({ FAQS }: {FAQS:FAQ[]}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {
        FAQS.map((faq, index) => (
          <AccordionItem value={index.toString()} key={index}>
            <AccordionTrigger>{faq.qn}</AccordionTrigger>
            <AccordionContent>{faq.ans}</AccordionContent>
          </AccordionItem>
        ))  
      }
      
    </Accordion>
  );
}
