import { Card, CardBody } from "@nextui-org/react";
import AuthForm from "./AuthFormFinal";

export default function LoginCard() {
  return (
    <Card className="px-20 py-10 font-satoshi shadow-2xl">
      <CardBody>
        <AuthForm />
      </CardBody>
    </Card>
  );
}
