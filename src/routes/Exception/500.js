import React from 'react';
import Exception from '@/components/Exception';
import {router} from "dva";

const { Link } = router;


const ServerError = () => (
  <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);

export default ServerError;
