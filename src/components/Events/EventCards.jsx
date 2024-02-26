"use client";

import { postEventAttendee } from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import {
  Card,
  CardBody,
  Image,
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

export default function EventCards({ item, showDelete }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openedEvent, setOpenedEvent] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {}, [isDeleted]);

  const handleDelete = () => {
    console.log(item.event_id);
    supabaseAuth.from("events").delete().eq("event_id", item.event_id).then();
    setIsDeleted(true);
  };

  const handleBooking = () => {
    console.log("hello");
    postEventAttendee(item.event_id);
  };

  return isDeleted ? null : (
    <>
      <div className="flex-grow-1 ">
        <Card
          className="w-96"
          isPressable={true}
          onPress={() => {
            setOpenedEvent(item);
            onOpen();
          }}
        >
          <CardBody>
            <Image
              className="h-60 w-dvw object-cover"
              src={item.photos}
              alt=""
            />
            <CardFooter>
              <div className="flex-grow px-2">
                <h2 className="font-bold">{item.name}</h2>
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
          size="4xl"
          backdrop="blur"
        >
          <ModalContent>
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
                  {showDelete ? (
                    <Button onPress={handleDelete}>Delete</Button>
                  ) : (
                    <Button onPress={handleBooking}>Book now</Button>
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
