/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "react-router-dom";
import data from "@/DataList/EventList";
// import { Button } from "../../ui/button";
import useUser from "@/features/authentication/useUser";
import useEvent from "@/features/events/useEvent";
import { toast } from "../../ui/use-toast";
import './WomenEventPage.css';
function WomenEventPage() {
	const [eventData, setEventData] = React.useState<any>([]);
	const [listData, setListData] = React.useState<any>([]);
	const { id } = useParams();
	const { eventCode, eventCodeOfUser, eventCodeOfUserLoading } = useEvent();
	React.useEffect(() => {
		setEventData(data[14]?.events);
		eventCodeOfUser();
	}, []);
	const { user, isAuthenticated } = useUser();
	const { registerForEvent, registerForEventLoading } = useEvent();
	React.useEffect(() => {
		eventData?.forEach((item: any) => {
			if (item.id === id) {
				setListData(item);
			}
		});
	});
	const handleRegisterForEvent = () => {
		if (isAuthenticated) {
			if (user?.name && user?.id && id) {
				const data = {
					user_name: user?.name,
					user_id: user?.id,
					event_code: Number(id),
				};

				registerForEvent(data);
			} else {
				toast({
					variant: "error",
					title: "Error",
					description: "Please login to register for the event1",
				});
			}
		} else {
			toast({
				variant: "error",
				title: "Error",
				description: "Please login to register for the event2",
			});
		}
	};
	return (
		<div className="women-eventsdata">
			{/* {eventCodeOfUserLoading && eventCode?.includes(Number(id)) ? (
				<Button
					className="bg-green-500   "
					onClick={() => handleRegisterForEvent()}
					disabled={!isAuthenticated || registerForEventLoading}
				>
					Register
				</Button>
			) : (
				<Button
					className="bg-green-500   "
					onClick={() => handleRegisterForEvent()}
					disabled={!isAuthenticated || registerForEventLoading}
				>
					unregister
				</Button>
			)}

			{user?.name} */}
			<div>
        		<h1 className='women-title'> {listData.title}</h1>
      		</div>

      		<div className='women-content'>
				<p className='women-description'>{listData.oneLiner}</p>
				<div className='women-top'>
					{/* <div className='flexwomen'>
						<h3 className='womenhead'>Date:</h3>
						<h4> {listData.date}</h4>
					</div>

					<div className='flexwomen'>
						<h3 className='womenhead'>Time:</h3>
						<h4> {listData.time}</h4>
					</div> */}

                    {/* {listData.eventType && (
                        <div className='flexwomen'>
                            <h3 className='womenhead'>Event Type:</h3>
                            <h4> {listData.eventType}</h4>
                        </div> 
                    )}

					<div className='flexwomen'>
						<h3 className='womenhead'>Venue:</h3>
						<h4> {listData.venue}</h4>
					</div>

					<div className='flexwomen'>
						<h3 className='womenhead'>Mode:</h3>
						<h4> {listData.mode}</h4>
					</div> */}
        		</div>

        		<div className='womenMainContent'>
                    {listData.description && (
						<div className='music-judgment'>
							<h3 className='musicSubtitle'>Description :</h3>
							<p className='rules'>{listData.description}</p>
						</div>
					)}

					<div className='women-note'> {/* <h3>Note : </h3> {listData.note} */}</div>
					<div className='women-contact'>
						<h3>Contact:</h3>
						{listData.contact?.map((contactitem: any) => (
							<div className='women-items'>
								{contactitem.name} : {contactitem.contact}
							</div>
						))}
					</div>
				</div>
      		</div>
		</div>
	);
}

export default WomenEventPage;
