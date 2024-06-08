import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSquare,
  faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";
import { DrawingElementsType } from "@/app/types/DrawingElementType";

type Props = {
  elementType: string;
  onClick: (element: string) => void;
};

const CanvasToolBarComponent = ({ elementType, onClick }: Props) => {
  const elementOptions: DrawingElementsType[] = [
    { type: "pointer", icon: faArrowPointer },
    { type: "line", icon: faPen },
    { type: "rectangle", icon: faSquare },
  ];

  return (
    <div className="absolute border-black top-4 border-4 rounded-lg bg-white flex items-center justify-center overflow-hidden">
      {elementOptions.map((element: DrawingElementsType, index: number) => (
        <div
          key={index}
          className={`${
            element.type === elementType && "bg-neutral-600 text-white"
          }  hover:bg-black hover:text-white transition duration-200 cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={element.icon}
            onClick={() => onClick(element.type)}
            className="h-4 w-4 p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasToolBarComponent;
