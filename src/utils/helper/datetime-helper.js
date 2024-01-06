function comparedatetime(datetime1, datetime2) {
  const d1 = new Date(datetime1);
  const d2 = new Date(datetime2);

  if (d1.getTime() < d2.getTime()) return true;
  return false;
}

module.exports = comparedatetime;
