/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useParams } from "react-router-dom";
import data from "@/DataList/EventList";
import { Button } from "../../ui/button";
import useUser from "@/features/authentication/useUser";
import useEvent from "@/features/events/useEvent";
import { toast } from "../../ui/use-toast";
import './QuizEventPage.css';
function QuizEventPage() {
	const [eventData, setEventData] = React.useState<any>([]);
	const [listData, setListData] = React.useState<any>([]);
	const { id } = useParams();
	const { eventCode, eventCodeOfUser, eventCodeOfUserLoading } = useEvent();
	React.useEffect(() => {
		setEventData(data[6]?.events);
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
		<div className="quiz-eventsdata">
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
        		<h1 className='quiz-title'> {listData.title}</h1>
      		</div>

      		<div className='quiz-content'>
				<p className='quiz-description'>{listData.description}</p>
				<div className='quiz-top'>
					<div className='flexquiz'>
						<h3 className='quizhead '>Team size: </h3>
						<h4>{listData.teamSizeFrontend}</h4>
					</div>

					{listData.eventType && (
						<div className='flexquiz'>
							<h3 className='quizhead'>Event type:</h3>
							<h4> {listData.eventType}</h4>
						</div>
					)}

					{/* <div className='flexquiz'>
						<h3 className='quizhead'>Date:</h3>
						<h4> {listData.date}</h4>
					</div>

					<div className='flexquiz'>
						<h3 className='quizhead'>Time:</h3>
						<h4> {listData.time}</h4>
					</div>

					<div className='flexquiz'>
						<h3 className='quizhead'>Venue:</h3>
						<h4> {listData.venue}</h4>
					</div> */}
        		</div>

        		<div className='quizMainContent'>
					{listData.judgingCriteria && (
						<div className='quiz-judgment'>
							<h3 className='quizSubtitle'>Judgement Criteria :</h3>
							<p className='rules'>{listData.judgingCriteria}</p>
						</div>
					)}

					<h3 className='quizSubtitle'>Rules :</h3>
					{listData.rules?.map((ruleItem: any, index: number) => {
						return(
							<p key={index} className='rules'>{ruleItem}</p>
						);
					})}
                    <br />
					<div className='quiz-note'> <h3>Note : </h3> {listData.note}</div>
					<div className='quiz-contact'>
						<h3>Contact:</h3>
						{listData.contact?.map((contactitem: any) => (
							<div className='quiz-items'>
								{contactitem.name} : {contactitem.contact}
							</div>
						))}
					</div>
				</div>
      		</div>
		</div>
	);
}

export default QuizEventPage;