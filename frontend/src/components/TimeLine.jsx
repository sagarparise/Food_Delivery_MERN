import { useSelector } from "react-redux";

const OrderTimeline = () => {

  const { currentOrderStatus } = useSelector((state) => state.cart);
 // console.log(currentOrderStatus)
 
  const statuses = ["Food Processing", "Pending", "Out of Delivery", "Delivered"];
  const currentStatusIndex = statuses.indexOf(currentOrderStatus);
 
  return (
    <ul className="timeline w-fit m-3 timeline-vertical mx-auto">
      {statuses.map((status, index) => (
        <li key={index}>
          {index !== 0 && <hr className={index <= currentStatusIndex ? "bg-primary" : ""} />}
          <div className={`timeline-middle ${index <= currentStatusIndex ? "text-primary" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-box text-[12px] font-semibold py-1">{status}</div>
          {index !== statuses.length - 1 && <hr className={index < currentStatusIndex ? "bg-primary" : ""} />}
        </li>
      ))}
    </ul>
  );
};



export default OrderTimeline;