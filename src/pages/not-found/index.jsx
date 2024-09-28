import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

import shoppingBag from "../../assets/bags2.jpg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Card className="flex h-full flex-col items-center border-none p-10">
      <CardHeader className="mb-8 p-0">
        <CardTitle className="text-4xl">Page not found</CardTitle>
      </CardHeader>
      <Button className="mb-10 mt-5" onClick={() => navigate("/shop/account")}>
        Back Home
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

export default NotFound;
