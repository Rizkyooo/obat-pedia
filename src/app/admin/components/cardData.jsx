import { Card, CardBody } from "@heroui/react";

export default function CardData({name, total}) {
  return (
    <div>
        <Card shadow="sm" className="h-42 w-96 p-4">
          <CardBody>
            <div className="flex flex-col justify-center gap-2">
              <h4 className="font-medium">Total {name}</h4>
              <p>{total}</p>
              <p className="opacity-65 ">{name}</p>
            </div>
          </CardBody>
        </Card>
    </div>
  )
}
