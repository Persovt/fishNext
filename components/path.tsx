import { useEffect, useState, createRef, forwardRef, RefObject } from "react";
const createPath = (
  ciricle: NodeListOf<HTMLElement>,
  section: NodeListOf<HTMLElement>
): string => {
  let createPath: string = "";
  ciricle.forEach((item: HTMLElement, index: number) => {
    if (index != ciricle.length - 1) {
      createPath += `M${Math.trunc(
        item.offsetLeft + item.offsetWidth / 2
      )} ${Math.trunc(item.offsetTop + item.offsetHeight / 2)}Q ${Math.trunc(
        item.offsetLeft + item.offsetWidth / 2
      )} ${section[index].offsetTop + section[index].offsetHeight} ${Math.trunc(
        section[index].offsetWidth / 2
      )} ${Math.trunc(
        section[index].offsetTop + section[index].offsetHeight
      )}T${Math.trunc(
        ciricle[index + 1].offsetLeft + ciricle[index + 1].offsetWidth / 2
      )} ${Math.trunc(
        ciricle[index + 1].offsetTop + ciricle[index + 1].offsetHeight / 2
      )}`;
    }
  });
  return createPath;
};

const createPathComponent = () => {
  const [currect, setCurrect] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [node, setNode] = useState<HTMLElement>();
  const [path, setPath] = useState("");

  useEffect(() => {
    console.log(node);
    if (node) {
      const ciricle: NodeListOf<HTMLElement> =
        node.querySelectorAll(".ciricle");
      const section: NodeListOf<HTMLElement> =
        node.querySelectorAll(".path-sec");

      window.addEventListener("scroll", () => {
        setCurrect(window.scrollY - section[0].offsetTop);
      });
      setMaxHeight(
        section[section.length - 1].offsetTop - section[0].offsetTop
      );
      setSvgHeight(
        section[section.length - 1].offsetTop +
          section[section.length - 1].offsetHeight
      );
      window.addEventListener("resize", () => {
        setPath(createPath(ciricle, section));
      });
      setPath(createPath(ciricle, section));
    }
  }, [node]);

  return (
    <>
      <style jsx global>{`
        .mover {
          offset-distance: ${(currect / maxHeight) * 100}%;
          offset-path: path("${path}");
        }
      `}</style>

      <svg
        ref={(ref: any) => setNode(ref?.closest(".container"))}
        style={{
          zIndex: -1,
          width: "100vw",
          height: `${svgHeight}px`,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <path
          d={path}
          stroke="#387298"
          fill="transparent"
          strokeLinecap="round"
          style={{
            fillRule: "evenodd",
            strokeWidth: 3,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            strokeDasharray: 10,
            strokeDashoffset: 0,
          }}
        ></path>
      </svg>
    </>
  );
};

export default createPathComponent;
