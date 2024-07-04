import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "@/app/util/formatDate";

type Props = {
  dueDate: string;
  handleDispatch: (newDate: string) => void;
};

const CalendarComponent = ({ dueDate, handleDispatch }: Props) => {
  const [isDateClicked, setIsDateClicked] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDateClicked(!isDateClicked);
  };

  const handleDateChanged = (date: Date) => {
    const formattedDate: string = formatDate(date);
    setSelectedDate(date);
    handleDispatch(formattedDate);
  };

  useEffect(() => {
    if (dueDate) {
      const [day, month, year] = dueDate.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      setSelectedDate(parsedDate);
    }
  }, [dueDate]); 

  return (
    <div
      onClick={handleDateClicked}
      className="flex items-center justify-center relative"
    >
      <DatePicker
        selected={selectedDate}
        customInput={
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="cursor-pointer z-50 hover:scale-110 transition duration-200 text-kuvitus-primary-blue"
          />
        }
        onChange={handleDateChanged}
        dateFormat="DD/mm/yyyy"
        todayButton="Due Today?"
        className="p-2 rounded-md shadow-md bg-white"
      />
    </div>
  );
};

export default CalendarComponent;
