import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

type FaqT = {
  num?: number;
  title: string;
  text: string;
};

function Accordion() {
  // cspell:disable
  const faqs: FaqT[] = [
    {
      title: "Where are these chairs assembled?",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
      title: "How long do I have to return my chair?",
      text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
      title: "Do you ship to countries outside the EU?",
      text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
  ];
  //cspell:enable

  return (
    <div className="accordion">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx + 1} item={faq} num={idx + 1} />
      ))}
    </div>
  );
}

function AccordionItem({ item, num }: { item: FaqT; num: number }) {
  const [isOpen, setIsOpen] = useState(false);
  function parseNumber(num: number) {
    if (num < 9) return "0" + num;
    return num;
  }
  return (
    <div
      className={"item " + (isOpen ? "open" : "")}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <p className="number">{parseNumber(num)}</p>
      <p className="title">{item.title}</p>
      <p className="icon">{isOpen ? "➖" : "➕"}</p>
      {isOpen ? <div className="content-box">{item.text}</div> : ""}
    </div>
  );
}
