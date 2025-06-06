function Footer({
  formattedTime, day, month, year, AppName, development
}) {
 

  return (
    <footer
      className={`px-16 bg-light dark:bg-dark dark:text-light py-2 text-center shadow-md border-t border-gray-200 dark:border-gray-500 font-serif z-[40]`}
    >
      <div className="flex justify-between items-center gap-6">
        <div>
          <p className=" text-dark dark:text-light">{AppName.toUpperCase()}</p>
        </div>

        {!development && (
          <div className="flex gap-4">
            <p className="text-sm text-dark dark:text-light ">
              since 2024 to {day}/{month}/{year} {formattedTime}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}


export default Footer;
