import React from 'react'

// Define the Props interface
interface SingleNoteProps {
    num: number;
  }

const SingleNote: React.FC<SingleNoteProps> = ({ num }) => {


    const textArr: string[] = [
        "6 Vestibulum vel purus magna. Class aptent taci",
        "5 Vestibulum vel purus magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus finibus risus et odio cursus, eu iaculis nisi semper",
        "4 Vestibulum vel purus",
        "3 Vestibulum vel purus magna. Class aptent taci",
        "2 Vestibulum vel purus magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus finibus risus et odio cursus, eu iaculis nisi semper",
        "1 Vestibulum vel purus vvel purus magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos him"
    ]
  return (
    <div className="single-note grid-item">
        <h2>Phasellus finibus risus </h2>
        <p>
            {textArr[num]}
        </p>
        <ul>
            <li>edit note</li>
        </ul>

    </div>
  )
}

export default SingleNote
