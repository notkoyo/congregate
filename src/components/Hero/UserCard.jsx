import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import GitHubIcon from "../Icons/GitHubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";

export const UserCard = ({ name, emoji, bio, imageSrc, linkedInHref, gitHubHref }) => {
  return (
    <Card
      shadow="none"
      className="max-w-[300px] border-none bg-transparent font-satoshi"
    >
      <CardHeader className="justify-between cursor-default">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={imageSrc}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">@Congregate</h5>
          </div>
        </div>
        <span className="cursor-default border-default-200 bg-transparent px-3 text-2xl text-foreground">
          {emoji}
        </span>
      </CardHeader>
      <CardBody className="px-3 py-0 cursor-default">
        <p className="pl-px text-small text-default-500">
          {bio}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1 items-center">
          <Link href={gitHubHref} target="_blank" className="text-black hover:text-black/40 cursor-pointer transition duration-300">
            <GitHubIcon />
            <span className="font-semibold text-md ml-1">GitHub</span>
          </Link>
        </div>
        <div className="flex gap-1">
          <Link href={linkedInHref} target="_blank" className="text-black hover:text-black/40 cursor-pointer transition duration-300">
            <LinkedInIcon />
            <span className="font-semibold text-md ml-1">LinkedIn</span>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
