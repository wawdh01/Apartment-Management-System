import React, { useEffect, useState } from 'react';
import Payment from './Payment';
import History from './History';
const axios = require('axios');

function Maintenance() {
    return (
        <div>
             <Payment></Payment>
        </div>
    );
}

export default Maintenance;