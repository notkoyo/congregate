import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { GoogleMap } from "../../components/Maps/GoogleMap";
import { GoogleMapAutocomplete } from "../../components/Maps/GoogleMapAutocomplete";
import { supabaseAuth } from "../../utils/supabaseClient";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import moment from "moment";
const { motion } = require("framer-motion");

export const Events = () => {
  const [selectedPos, setSelectedPos] = useState({
    zoom: 10,
    center: { lat: 0, lng: 0 },
  });
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [distance, setDistance] = useState(26000);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [distanceSlider, setDistanceSlider] = useState(50);
  const [priceRangeSlider, setPriceRangeSlider] = useState([0, 100]);
  const [openedEvent, setOpenedEvent] = useState();

  useEffect(() => {
    if (!selectedPos.center.lat && !selectedPos.center.lng) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSelectedPos({
          ...selectedPos,
          center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
      });
    } else {
      supabaseAuth
        .rpc("get_events_radius", {
          radius: distance,
          user_lat: selectedPos.center.lat,
          user_lng: selectedPos.center.lng,
        })
        .select(`*`)
        .gte("event_price", priceRange[0])
        .lte("event_price", priceRange[1])
        .order("start_date", {descending: true})
        .then(({ data }) => {
          setSelectedEvents(data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedPos, distance, priceRange]);

  const handlePriceChange = () => {
    setPriceRange(priceRangeSlider);
  };

  const handleDistanceChange = () => {
    setDistance(distanceSlider);
  };

  const handleOpen = (item) => {
    console.log(item);
    onOpen();
  };

  return (
    <>
      <div className="z-0 m-4 mt-8 flex">
        <div className="flex flex-col gap-2">
          <section className="flex flex-col gap-2">
            <GoogleMap
              selectedPos={selectedPos}
              selectedEvents={selectedEvents}
            />
            <GoogleMapAutocomplete setSelectedPos={setSelectedPos} />
          </section>
          <section>
            <Slider
              label="Distance"
              value={distanceSlider}
              onChange={setDistanceSlider}
              onChangeEnd={handleDistanceChange}
              defaultValue={10}
              minValue={1}
              maxValue={50}
              formatOptions={{ style: "unit", unit: "kilometer" }}
              marks={[
                {
                  value: 5,
                  label: "5km",
                },
                {
                  value: 15,
                  label: "15km",
                },
                {
                  value: 25,
                  label: "25km",
                },
                {
                  value: 50,
                  label: "50km",
                },
              ]}
            />
            <Slider
              label="Price range"
              formatOptions={{ style: "currency", currency: "GBP" }}
              maxValue={100}
              minValue={0}
              value={priceRangeSlider}
              onChange={setPriceRangeSlider}
              onChangeEnd={handlePriceChange}
            />
          </section>
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-5">
          {selectedEvents.length > 0 ?
            selectedEvents.map((item) => {
              return (
                <>
                  <div
                    className="flex-grow-1 h-96 w-2/5  rounded-lg border-1 border-solid border-black"
                    layoutId={item.event_id}
                    key={item.event_id}
                    // onClick={() => {
                    //   setOpenedEvent(item);
                    //   onOpen();
                    // }}
                  >
                    <img
                      className="h-4/5 w-full object-cover "
                      src={item.photos}
                      alt=""
                    />
                    <div className="flex-grow px-2">
                      <h2 className="font-bold">{item.name}</h2>
                      <p className="line-clamp-1">{item.description}</p>
                      <div className="flex font-medium">
                        <p className="flex-grow">
                          Starts:{" "}
                          {`${moment(item.start_date).format("DD/MM/YYYY")}, ${moment(item.start_date).format("HH:mm")}`}
                        </p>
                        <p>
                          {item.event_price ? `£${item.event_price}` : "FREE"}
                        </p>
                        <Button
                          onPress={() => {
                            setOpenedEvent(item);
                            onOpen();
                          }}
                        >
                          show more
                        </Button>
                      </div>
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
                            <ModalHeader>{openedEvent.name}</ModalHeader>
                            <ModalBody>
                              <img src={openedEvent.photos} alt="" />
                              <p>{openedEvent.description}</p>
                            </ModalBody>
                            <ModalFooter>
                              <p className="flex-grow">
                                Starts:{" "}
                                {`${moment(item.start_date).format("DD/MM/YYYY")}, ${moment(item.start_date).format("HH:mm")}`}
                              </p>
                              <p>
                                {item.event_price
                                  ? `£${item.event_price}`
                                  : "FREE"}
                              </p>
                              <Button>Book now</Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                </>
              );
            }): <h2>no events</h2>}
        </div>
      </div>
    </>
  );
};
