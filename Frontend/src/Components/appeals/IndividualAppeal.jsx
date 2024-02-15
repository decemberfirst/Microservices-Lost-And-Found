/* eslint-disable react/prop-types */
function IndividualAppeal({ appeal }) {
  const { appealDescription, appealedBy } = appeal;
  return (
    <div>
      <div className='flex items-center gap-2 font-primary text-text_primary'>
        <div className='w-[35px] h-[35px] rounded-full overflow-hidden'>
          <img
            src='https://img.freepik.com/premium-photo/portrait-real-black-african-man-with-no-expression-id-passport-photo_262288-7508.jpg'
            alt=''
          />
        </div>
        <h2>{appealedBy.username}</h2>
      </div>
      <p className='pt-3'>{appealDescription}</p>
    </div>
  );
}

export default IndividualAppeal;
