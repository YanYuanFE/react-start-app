import React from 'react';
import Exception from '@/components/Exception';
import {router} from "dva";

const { Link } = router;

const AuthError = () => (
  <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);

export default AuthError;
