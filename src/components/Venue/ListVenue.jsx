import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  CardHeader,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import Link from "next/link";
import EditVenue from "./EditVenue";

export default function ListVenue({ venue, setVenueHasBeenUpdate }) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [openedVenue, setOpenedVenue] = useState();

  const handleEditClick = () => {
    setShowEditMenu(true);
  };

  const handleEditClose = () => {
    setShowEditMenu(false);
  };

  return (
    <>
      {/* Use a div instead of Card with onPress */}
      <div
        className="py-4"
        onClick={() => {
          setOpenedVenue(venue);
          onOpen();
        }}
      >
        <Card>
          <CardHeader className="h-20 flex-col items-start overflow-hidden px-4 pb-0 pt-2">
            <p className="text-tiny font-bold uppercase">{venue.name}</p>
            <small className="line-clamp-1 text-default-500">
              {venue.description}
            </small>
            {venue.isUserVenue && (
              <p className="text-tiny font-bold uppercase">Your Venue</p>
            )}
          </CardHeader>
          <CardBody className="h-300 flex w-full flex-col items-center overflow-visible py-2 text-center">
            <Image
              alt="Card background"
              className="h-260 w-400 rounded-xl object-cover"
              src={venue.photos}
            />
          </CardBody>

          <CardBody className="h-100 overflow-visible pb-2 pt-5">
            <p className="text-tiny font-bold uppercase">{venue.address_1}</p>
            <p className="text-tiny font-bold uppercase">{venue.postcode}</p>
            <p className="text-tiny font-bold uppercase">{venue.city}</p>
            <div className="mt-3">
              {venue.isUserVenue && (
                <Button
                  onClick={handleEditClick}
                  className="w-full"
                  color="primary"
                  radius="lg"
                >
                  Edit
                </Button>
              )}
            </div>
            {showEditMenu === true ? (
              <EditVenue
                setVenueHasBeenUpdate={setVenueHasBeenUpdate}
                handleEditClose={handleEditClose}
                userId={venue.founder_id}
                venue_id={venue.venue_id}
              />
            ) : null}
          </CardBody>
        </Card>
      </div>
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
              <ModalHeader>{openedVenue.name}</ModalHeader>
              <ModalBody>
                <img src={openedVenue.photos} alt="" />
                <p>{openedVenue.description}</p>
              </ModalBody>
              <ModalFooter>
                <p>{openedVenue.price ? `£${openedVenue.price}` : "FREE"}</p>
                <Link href="/host/event">
                  <Button
                    onPress={() => {
                      const eventForm = JSON.parse(
                        localStorage.getItem("eventFormDetails"),
                      );
                      eventForm.venue_id = venue.venue_id;
                      localStorage.setItem(
                        "eventFormDetails",
                        JSON.stringify(eventForm),
                      );
                    }}
                  >
                    Choose venue
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
