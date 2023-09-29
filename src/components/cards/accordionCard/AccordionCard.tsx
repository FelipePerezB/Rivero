import { IconDefinition, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useRef, useState } from "react";
import Card from "@components/Card";

export default function AccordionCard({
  head,
  children,
  headData,
}: {
  headData?: {
    title: string;
    icon: ReactNode;
  };
  head?: ReactNode;
  children: ReactNode;
}) {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const $chevron = headRef.current?.querySelector(
      "#chevron-icon"
    ) as HTMLElement;
    if (!$chevron || !parentRef.current || !headRef.current) return;

    $chevron.style.transform = `rotate(${isOpen ? "180deg" : "90deg"})`;
    const bodySize = bodyRef.current?.clientHeight || 0;
    const headSize = headRef.current?.clientHeight;
    isOpen
      ? (parentRef.current.style.height = `calc(${headSize}px + ${bodySize}px - 2px + ${
          bodySize ? "0.5rem" : ""
        })`)
      : (parentRef.current.style.height = `calc(${headSize}px - 2px)`);
  }, [isOpen]);
  return (
    <Card>
      <section
        className="transition-all duration-[400ms] overflow-hidden"
        ref={parentRef}
      >
        <div
          ref={headRef}
          className="cursor-pointer flex items-center font-semibold mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {head}
          <FontAwesomeIcon
            className="transition-al duration-[400ms]"
            id="chevron-icon"
            size="xs"
            icon={faChevronUp}
          />
        </div>
        {children?.toString() && (
          <div ref={bodyRef}>
            <div className="h-0.5 bg-gray-100 rounded-full"></div>
            {children}
          </div>
        )}
      </section>
    </Card>
  );
}

export function AccordionChild({ children }: { children: ReactNode }) {
  return <div className="rounded-sm hover:bg-slate-50 p-2.5">{children}</div>;
}

export function AccordionHead({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-between items-center pr-2">
      {children}
    </div>
  );
}
