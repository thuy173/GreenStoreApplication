import { useState } from 'react';
import { Reorder } from "framer-motion"

import { Card, CardTitle, CardHeader, CardContent } from '@mui/material';

export function DragDrop() {
  const [lengthArray, setLengthArray] = useState([1, 2, 3, 4, 5]);
  return (
    <Reorder.Group value={lengthArray} onReorder={setLengthArray}>
      {lengthArray.map((item, index) => (
        <Reorder.Item value={item} key={item}>
          <Card>
            <CardHeader>
              <CardTitle>Item {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>content itemt</p>
            </CardContent>
          </Card>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
