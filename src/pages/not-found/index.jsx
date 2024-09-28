import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import shoppingBag from "../../assets/bags2.jpg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Card className="p-10 h-full flex flex-col items-center border-none">
      <CardHeader className="p-0  mb-8">
        <CardTitle className="text-4xl">Page not found</CardTitle>
      </CardHeader>
      <Button className="mt-5 mb-10" onClick={() => navigate("/shop/account")}>
        Back Home
      </Button>
      <CardContent>
        <div className="max-w-[500px] h-full md:h-[500px] rounded-full overflow-hidden">
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

export default NotFound;
