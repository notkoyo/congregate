"use client";

import {
  deleteEventAttendee,
  fetchCurrentUserID,
  isUserBookedOn,
  postEventAttendee,
} from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";
import BookedOnMessage from "./BookedOnMessage";
import { useRouter } from "next/navigation";

export default function EventCards({ item, showDelete, setIsLoading }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openedEvent, setOpenedEvent] = useState();
  const [isDeleted, setIsDeleted] = useState(false);
  const [bookedOn, setBookedOn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    isUserBookedOn(item.event_id).then((res) => {
      setBookedOn(res);
    });
    fetchCurrentUserID().then((res) => {
      if (!res) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  }, [isDeleted]);

  const handleDelete = () => {
    supabaseAuth.from("events").delete().eq("event_id", item.event_id).then();
    setIsDeleted(true);
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    postEventAttendee(item.event_id);
    setMessageBody("Success! You are going to this event!");
    setShowMessage(true);
    setBookedOn((prev) => !prev);
  };

  const handleDropout = () => {
    deleteEventAttendee(item.event_id);
    setMessageBody("You have been removed from this event");
    setShowMessage(true);
    setBookedOn((prev) => !prev);
  };

  const handleHide = () => {
    setShowMessage(false);
  };

  return isDeleted ? null : (
    <>
      <div className="flex-grow-1 font-satoshi">
        <Card
          className="w-96"
          isPressable={true}
          onPress={() => {
            setOpenedEvent(item);
            onOpen();
          }}
        >
          <CardBody>
            <img
              className="h-60 w-dvw rounded-lg object-cover"
              src={item.photos}
              alt=""
            />
            <CardFooter>
              <div className="flex-grow px-2">
                <div className="flex justify-between">
                  <h2 className="font-satoshi font-bold">{item.name}</h2>
                  {bookedOn && (
                    <p className="rounded border bg-green-400 px-2 py-1">
                      You're Going!
                    </p>
                  )}
                </div>
                <p className="line-clamp-1">{item.description}</p>
                <div className="flex font-medium">
                  <p className="flex-grow">
                    Starts:{" "}
                    {`${moment(item.start_date).format("DD/MM/YYYY")}, ${moment(item.start_date).format("HH:mm")}`}
                  </p>
                  <p>{item.event_price ? `£${item.event_price}` : "FREE"}</p>
                </div>
              </div>
            </CardFooter>
          </CardBody>
        </Card>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          size="lg"
          backdrop="blur"
          scrollBehavior="inside"
          placement={window.innerWidth < 384 ? "bottom" : "bottom-center"}
        >
          <ModalContent className="mb-20">
            {(onClose) => (
              <>
                <ModalHeader>{openedEvent.name}</ModalHeader>
                <ModalBody>
                  <img src={openedEvent.photos} alt="" />
                  <p>{openedEvent.description}</p>
                </ModalBody>
                <ModalFooter>
                  <p className="flex-grow">
                    Starts:{" "}
                    {`${moment(openedEvent.start_date).format("DD/MM/YYYY")}, ${moment(openedEvent.start_date).format("HH:mm")}`}
                  </p>
                  <p>
                    {openedEvent.event_price
                      ? `£${openedEvent.event_price}`
                      : "FREE"}
                  </p>
                  {showDelete && <Button onPress={handleDelete}>Delete</Button>}
                  {bookedOn ? (
                    <Button color="danger" onPress={handleDropout}>
                      Drop out
                    </Button>
                  ) : (
                    <Button color="success" onPress={handleBooking}>
                      Book now
                    </Button>
                  )}
                  {showMessage && (
                    <BookedOnMessage
                      handleHide={handleHide}
                      text={messageBody}
                    />
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
