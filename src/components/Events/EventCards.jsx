"use client";

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
    setIsDeleted(true)
  };

  return isDeleted ? null : (
    <>
        <div className="flex-grow-1 " key={item.event_id}>
          <Card
            className="h-64 w-96"
            isPressable={true}
            onPress={() => {
              setOpenedEvent(item);
              onOpen();
            }}
          >
            <CardBody>
              <Image
                className="h-4/5 w-full object-cover "
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
                      <Button>Book now</Button>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </>)
}
