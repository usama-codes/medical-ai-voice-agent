import { Doctors } from '@/app/shared/list'
import React from 'react'
import DoctorCard from './DoctorCard'

function DoctorsAgentList() {
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-xl'>AI Specialist Doctors</h2>

        <div className='grid gap-5 mt-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1'>
            {Doctors.map((doctor, index) => (
                <div
                    key={index}>
                        <DoctorCard doctorAgent={doctor} />
                </div>
            ))}
        </div>
    </div>

  )
}

export default DoctorsAgentList