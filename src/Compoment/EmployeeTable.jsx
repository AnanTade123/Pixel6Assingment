/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useCountries } from 'use-react-countries';
import { useEmployeeDataQuery } from '../Slice/slice';
import TableCompoment from './Table/TableCompoment';
import { Button } from '@material-tailwind/react';

export default function EmployeeTable() {
  const { countries } = useCountries();
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const { data } = useEmployeeDataQuery();
  console.log(data);

  if (!data) {
    return null;
  }

  const countryAbbreviations = {
    'United States': 'USA',
    'United Kingdom': 'UK',
  };
  
  const userdata = data?.users;
  console.log(userdata);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ cell: { value } }) => <img src={value} alt='Profile' className='w-10 h-5 ml-10' />,
    },
    {
      Header: 'Full Name',
      accessor: (row) => `${row.firstName} ${row.maidenName} ${row.lastName}`,
    },
    {
      Header: 'Demography',
      accessor: (row) => `${row.gender.charAt(0).toUpperCase()} / ${row.age}`,
    },
    {
      Header: 'Designation',
      accessor: (row) => row.company.title,
    },
    {
      Header: 'Country',
      accessor: (row) => `${row.address.state}, ${countryAbbreviations[row.address.country] || row.address.country}`,
    },
  ];

  const filteredData = userdata.filter((user) => {
    return (
      (country ? user.address.country === country : true) &&
      (gender ? user.gender === gender : true)
    );
  });

 
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='w-3/4 px-4'>
        {/* Header Part */}
        <div className='flex justify-between mt-10'>
          <p className='text-2xl'>Employees</p>

          {/* Filters */}
          <div className='flex'>
            <div className='w-48'>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className='w-36 h-10 rounded-md border-4'
              >
                <option value='' disabled>
                  Country
                </option>
                {countries.map(({ name, flags }) => (
                  <option key={name} value={name} className='flex items-center gap-2'>
                    <img src={flags.svg} alt={name} className='h-5 w-5 rounded-full object-cover' />
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-48'>
              <select
                name=''
                id=''
                className='w-36 h-10 rounded-md border-4'
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className='mt-5 border-2'>
          {/* Employee Table */}
          <TableCompoment data={currentData} columns={columns} />
        </div>

        {/* Pagination */}
        <div className='flex justify-between mt-5'>
          <div>
            <Button variant="outlined" className="flex items-center gap-2" onClick={previousPage} disabled={currentPage === 1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              Previous
            </Button>
          </div>
          <div>
            <p>Page No :- <span>{currentPage}</span></p>
          </div>
          <div>
            <Button
              variant="outlined"
              className="flex items-center gap-2"
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
            > 
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
