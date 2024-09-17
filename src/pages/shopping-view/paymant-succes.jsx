import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import shoppingBag from "../../assets/bags.jpg";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10 h-screen flex flex-col justify-center items-center">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
      </CardHeader>
      <Button className="mt-5 mb-10" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
      <CardContent>
        <div className="w-[500px] h-[500px] rounded-full overflow-hidden">
          <img
            src={shoppingBag}
            alt="shopping bag"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentSuccessPage;