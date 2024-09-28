import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

import shoppingBag from "../../assets/bags.jpg";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="flex h-full flex-col items-center p-10">
      <CardHeader className="mb-8 p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
      </CardHeader>
      <Button className="mb-10 mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
      <CardContent>
        <div className="h-full max-w-[500px] overflow-hidden rounded-full md:h-[500px]">
          <img
            src={shoppingBag}
            alt="shopping bag"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentSuccessPage;
