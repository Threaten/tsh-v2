"use client";

import {
  countNumberOfOccurenceInDateOfBirth,
  countNumberOfOccurenceInName,
  timSoLap,
  tinhChiSoBanTheTiemThuc,
  tinhChiSoCanBang,
  tinhChiSoDamMeTiemAn,
  tinhChiSoDuongDoi,
  tinhChiSoNguyenAmDauTrongTen,
  tinhChiSoNoiTam,
  tinhChiSoPhuongTienNhanThucCamXuc,
  tinhChiSoPhuongTienNhanThucTheChat,
  tinhChiSoPhuongTienNhanThucTinhThan,
  tinhChiSoPhuongTienNhanThucTrucGiac,
  tinhChiSoSuMenh,
  tinhChiSoThaiDo,
  tinhChiSoThieu,
  tinhChiSoTinhCach,
  tinhChiSoYeu,
  tinhChuCuoiTrongTen,
  tinhChuDauTrongTen,
  tinhNgaySinh1So,
} from "./calc";
import { useState, useEffect } from "react";
import NumberDiagram, { NumberDiagramData } from "./components/NumberDiagram";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState(0);
  const [monthOfBirth, setMonthOfBirth] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [chiSoDuongDoi, setChiSoDuongDoi] = useState(0);
  const [chiSoTinhCach, setChiSoTinhCach] = useState(0);
  const [chiSoNoiTam, setChiSoNoiTam] = useState(0);
  const [chiSoDamMeTiemAn, setChiSoDamMeTiemAn] = useState<number[]>([]);
  const [chiSoNguyenAmDauTrongTen, setChiSoNguyenAmDauTrongTen] = useState(0);
  const [chiSoChuDauTrongTen, setChiSoChuDauTrongTen] = useState(0);
  const [chiSoChuCuoiTrongTen, setChiSoChuCuoiTrongTen] = useState(0);
  const [chiSoThaiDo, setChiSoThaiDo] = useState(0);
  const [chiSoBanTheTiemThuc, setChiSoBanTheTiemThuc] = useState(0);
  const [chiSoNhanThucTinhThan, setChiSoNhanThucTinhThan] = useState(0);
  const [chiSoNhanThucTrucGiac, setChiSoNhanThucTrucGiac] = useState(0);
  const [chiSoNhanThucCamXuc, setChiSoNhanThucCamXuc] = useState(0);
  const [chiSoNhanThucTheChat, setChiSoNhanThucTheChat] = useState(0);
  const [chiSoCanBang, setChiSoCanBang] = useState(0);
  const [chiSoThieu, setChiSoThieu] = useState<number[]>([]);
  const [chiSoYeu, setChiSoYeu] = useState<number[]>([]);
  const [chiSoSuMenh, setChiSoSuMenh] = useState(0);
  const [ngaySinh1So, setNgaySinh1So] = useState(0);
  const [thangSinh1So, setThangSinh1So] = useState(0);
  const [namSinh1So, setNamSinh1So] = useState(0);
  const [soLap, setSoLap] = useState<number[]>([]);
  const [diagramNumbers, setDiagramNumbers] = useState<NumberDiagramData>({
    top: { number: "1", peak: 4, age: 0, year: 0, type: "peak" },
    bottom: { number: "11", peak: 4, type: "challenge" },
    left: { number: "3", peak: 1, age: 0, type: "peak", year: 0 },
    leftSide: { number: "4" },
    topCenter: { number: "2", peak: 3, age: 0, type: "peak" },
    right: { number: "5", peak: 2, age: 0, type: "peak" },
    rightSide: { number: "6" },
    center: { number: "10" },
    lowerRight: { number: "9", peak: 2, type: "challenge" },
    lowerLeft: { number: "7", peak: 1, type: "challenge" },
    lowerCenter: { number: "8", peak: 3, type: "challenge" },
  });

  // Update diagram numbers when calculations change
  useEffect(() => {
    if (!fullName || !dob) return;

    /* peak 4 */
    // Calculate Peak 4 number
    const peak4Number = thangSinh1So + namSinh1So;
    const peak4DisplayNumber =
      peak4Number <= 9
        ? peak4Number
        : peak4Number > 9 &&
          detectSpecialNumberForPeak34(convertInto1DigitForPeak34(peak4Number))
        ? convertInto1DigitForPeak34(peak4Number) +
          "/" +
          convertInto1Digit(peak4Number)
        : convertInto1Digit(peak4Number);

    // Calculate year and age for Peak 4
    const peak4Age = 36 - convertInto1Digit(chiSoDuongDoi) + 27;
    const peak4Year = yearOfBirth + peak4Age;
    /* end peak 4 */

    /* peak 3 */

    const peak3Number = convertInto1DigitKeepSpecialNumber(
      convertInto1Digit(thangSinh1So + ngaySinh1So) +
        convertInto1Digit(namSinh1So + ngaySinh1So)
    );

    const peak3DisplayNumber =
      peak3Number <= 9
        ? peak3Number
        : peak3Number > 9 && detectSpecialNumberForPeak34(peak3Number)
        ? peak3Number + "/" + convertInto1Digit(peak3Number)
        : peak3Number;
    const peak3Age = 36 - convertInto1Digit(chiSoDuongDoi) + 18;
    const peak3Year = yearOfBirth + peak3Age;

    /* end peak 3 */

    /* peak 2 */
    const peak2Number = convertInto1DigitKeepSpecialNumber(
      namSinh1So + ngaySinh1So
    );
    const peak2DisplayNumber = detectSpecialNumber(peak2Number)
      ? peak2Number + "/" + convertInto1Digit(peak2Number)
      : peak2Number;
    const peak2Age = 36 - convertInto1Digit(chiSoDuongDoi) + 9;
    const peak2Year = yearOfBirth + 36 - convertInto1Digit(chiSoDuongDoi) + 9;
    /* end peak 2 */

    /* peak 1 */
    const peak1Number = convertInto1DigitKeepSpecialNumber(
      thangSinh1So + ngaySinh1So
    );
    const peak1DisplayNumber = detectSpecialNumber(peak1Number)
      ? peak1Number + "/" + convertInto1Digit(peak1Number)
      : peak1Number;

    const peak1Age = 36 - convertInto1Digit(chiSoDuongDoi);
    const peak1Year = yearOfBirth + peak1Age;
    /* end peak 1 */

    /* challenge 2 */
    const challenge2Number = Math.abs(
      convertInto1Digit(ngaySinh1So) - convertInto1Digit(namSinh1So)
    );

    console.log("challenge2Number", challenge2Number);

    /* end challenge 2 */

    setDiagramNumbers({
      top: {
        number: String(peak4DisplayNumber),
        peak: 4,
        age: peak4Age,
        year: peak4Year,
        type: "peak",
      },
      bottom: {
        number: convertInto1Digit(
          Math.abs(
            convertInto1Digit(thangSinh1So) - convertInto1Digit(namSinh1So)
          )
        ),
        peak: 4,
        type: "challenge",
      },
      left: {
        number: peak1DisplayNumber,
        peak: 1,
        age: peak1Age,
        year: peak1Year,
      },
      leftSide: { number: convertInto1Digit(thangSinh1So) },
      topCenter: {
        number: peak3DisplayNumber,
        peak: 3,
        age: peak3Age,
        year: peak3Year,
        type: "peak",
      },
      right: {
        number: peak2DisplayNumber,
        peak: 2,
        age: peak2Age,
        year: peak2Year,
      },
      rightSide: { number: convertInto1Digit(namSinh1So) },
      center: { number: convertInto1Digit(ngaySinh1So) },
      lowerRight: {
        number: challenge2Number,
        peak: 2,
        type: "challenge",
      },
      lowerLeft: {
        number: convertInto1Digit(
          Math.abs(
            convertInto1Digit(ngaySinh1So) - convertInto1Digit(thangSinh1So)
          )
        ),
        peak: 1,
        type: "challenge",
      },
      lowerCenter: {
        number: convertInto1Digit(
          Math.abs(
            Math.abs(
              convertInto1Digit(ngaySinh1So) - convertInto1Digit(namSinh1So)
            ) -
              Math.abs(
                convertInto1Digit(ngaySinh1So) - convertInto1Digit(thangSinh1So)
              )
          )
        ),
        peak: 3,
        type: "challenge",
      },
    });
  }, [
    chiSoNoiTam,
    chiSoThaiDo,
    chiSoTinhCach,
    chiSoDuongDoi,
    chiSoSuMenh,
    ngaySinh1So,
    thangSinh1So,
    namSinh1So,
    yearOfBirth,
    fullName,
    dob,
  ]);

  const convertInto1Digit = (number: number) => {
    let result = number;
    while (result > 9) {
      result = String(result)
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    return result;
  };

  const convertInto1DigitKeepSpecialNumber = (number: number) => {
    let result = number;
    while (result >= 10) {
      if (
        result === 13 ||
        result === 14 ||
        result === 16 ||
        result === 19 ||
        result === 11 ||
        result === 22 ||
        result === 33
      ) {
        console.log(result);

        return result;
      } else {
        result = String(result)
          .split("")
          .reduce((a, b) => a + parseInt(b), 0);
      }
    }

    return result;
  };

  const detectSpecialNumber = (number: number) => {
    if (
      number === 13 ||
      number === 14 ||
      number === 16 ||
      number === 19 ||
      number === 11 ||
      number === 22 ||
      number === 33
    ) {
      return true;
    }
  };

  const detectSpecialNumberForPeak34 = (number: number) => {
    if (
      number === 10 ||
      number === 13 ||
      number === 14 ||
      number === 16 ||
      number === 19 ||
      number === 11 ||
      number === 22 ||
      number === 33
    ) {
      return true;
    }
  };

  const convertInto1DigitForPeak34 = (number: number) => {
    let result = number;
    while (result > 10) {
      if (
        result === 13 ||
        result === 14 ||
        result === 16 ||
        result === 19 ||
        result === 11 ||
        result === 22 ||
        result === 33 ||
        result === 10
      ) {
        console.log(result);

        return result;
      } else {
        result = String(result)
          .split("")
          .reduce((a, b) => a + parseInt(b), 0);
      }
    }

    return result;
  };

  let year = "";
  let month = "";
  let date = "";

  const onSubmit = () => {
    setChiSoDuongDoi(0);
    setChiSoTinhCach(0);
    setChiSoNoiTam(0);
    setChiSoDamMeTiemAn([]);
    setChiSoNguyenAmDauTrongTen(0);
    setChiSoBanTheTiemThuc(0);

    // const fullName = document.getElementById("txtFullName") as HTMLInputElement;
    // const dob = document.getElementById("txtDoB") as HTMLInputElement;

    if (!fullName || !dob) {
    } else {
      year = dob.split("-")[0];
      month = dob.split("-")[1];
      date = dob.split("-")[2];
      setYearOfBirth(Number(year));
      setMonthOfBirth(Number(month));
      setDateOfBirth(Number(date));
      setChiSoDuongDoi(
        tinhChiSoDuongDoi({
          fullName: fullName,
          dateOfBirth: date,
          monthOfBirth: month,
          yearOfBirth: year,
        })
      );

      setChiSoTinhCach(
        tinhChiSoTinhCach({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNoiTam(
        tinhChiSoNoiTam({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoDamMeTiemAn(
        tinhChiSoDamMeTiemAn({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNguyenAmDauTrongTen(
        tinhChiSoNguyenAmDauTrongTen({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoChuDauTrongTen(
        tinhChuDauTrongTen({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoChuCuoiTrongTen(
        tinhChuCuoiTrongTen({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoThaiDo(
        tinhChiSoThaiDo({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoBanTheTiemThuc(
        tinhChiSoBanTheTiemThuc({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNhanThucTinhThan(
        tinhChiSoPhuongTienNhanThucTinhThan({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNhanThucCamXuc(
        tinhChiSoPhuongTienNhanThucCamXuc({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNhanThucTrucGiac(
        tinhChiSoPhuongTienNhanThucTrucGiac({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoNhanThucTheChat(
        tinhChiSoPhuongTienNhanThucTheChat({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoCanBang(
        tinhChiSoCanBang({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoThieu(
        tinhChiSoThieu({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoYeu(
        tinhChiSoYeu({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setChiSoSuMenh(
        tinhChiSoSuMenh({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );

      setNgaySinh1So(
        tinhNgaySinh1So({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        }).date
      );
      setThangSinh1So(
        tinhNgaySinh1So({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        }).month
      );
      setNamSinh1So(
        tinhNgaySinh1So({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        }).year
      );
      setSoLap(
        timSoLap({
          fullName: fullName,
          dateOfBirth: dob.split("-")[2],
          monthOfBirth: dob.split("-")[1],
          yearOfBirth: dob.split("-")[0],
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 text-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">
          Thần Số Học
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="bg-amber-50/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-amber-200/50">
              <div className="space-y-6">
                <div className="backdrop-blur-sm bg-amber-100/50 p-4 rounded-lg hover:bg-amber-100/70 transition-colors">
                  <label className="text-lg font-medium mb-2 block">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="txtFullName"
                    className="w-full bg-white/70 border border-amber-200/70 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                  />
                </div>
                <div className="backdrop-blur-sm bg-amber-100/50 p-4 rounded-lg hover:bg-amber-100/70 transition-colors">
                  <label className="text-lg font-medium mb-2 block">
                    Ngày tháng năm sinh
                  </label>
                  <input
                    className="w-full bg-white/70 border border-amber-200/70 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    type="date"
                    id="txtDoB"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-800 py-3 px-6 rounded-lg font-medium 
                           hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]
                           shadow-lg hover:shadow-amber-500/25"
                  onClick={onSubmit}
                >
                  Tính Toán
                </button>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-amber-50/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-amber-200/50">
            <div className="overflow-x-auto">
              {" "}
              <table className="w-full border-collapse shadow-lg">
                <thead>
                  <tr className="bg-amber-100/80">
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Nội tâm
                    </th>
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Tính cách
                    </th>
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Sứ mệnh
                    </th>
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Ngày sinh
                    </th>
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Đường đời
                    </th>
                    <th className="p-3 text-center border border-amber-200/50 font-medium">
                      Thái độ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-amber-100/50 transition-colors">
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {chiSoNoiTam <= 9
                          ? chiSoNoiTam
                          : chiSoNoiTam > 9 && detectSpecialNumber(chiSoNoiTam)
                          ? chiSoNoiTam + "/" + convertInto1Digit(chiSoNoiTam)
                          : convertInto1Digit(chiSoNoiTam)}
                      </span>
                    </td>
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {chiSoTinhCach <= 9
                          ? chiSoTinhCach
                          : chiSoTinhCach > 9 &&
                            detectSpecialNumber(chiSoTinhCach)
                          ? chiSoTinhCach +
                            "/" +
                            convertInto1Digit(chiSoTinhCach)
                          : convertInto1Digit(chiSoTinhCach)}
                      </span>
                    </td>
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {chiSoSuMenh <= 9
                          ? chiSoSuMenh
                          : chiSoSuMenh > 9 && detectSpecialNumber(chiSoSuMenh)
                          ? chiSoSuMenh + "/" + convertInto1Digit(chiSoSuMenh)
                          : convertInto1Digit(chiSoSuMenh)}
                      </span>
                    </td>
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {ngaySinh1So <= 9
                          ? ngaySinh1So
                          : ngaySinh1So > 9 && detectSpecialNumber(ngaySinh1So)
                          ? ngaySinh1So + "/" + convertInto1Digit(ngaySinh1So)
                          : convertInto1Digit(ngaySinh1So)}
                      </span>
                    </td>
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {chiSoDuongDoi <= 9
                          ? chiSoDuongDoi
                          : chiSoDuongDoi > 9 &&
                            detectSpecialNumber(chiSoDuongDoi)
                          ? chiSoDuongDoi +
                            "/" +
                            convertInto1Digit(chiSoDuongDoi)
                          : convertInto1Digit(chiSoDuongDoi)}
                      </span>
                    </td>
                    <td className="p-3 text-center border border-amber-200/50">
                      <span className="text-amber-600 font-bold text-2xl">
                        {chiSoThaiDo <= 9
                          ? chiSoThaiDo
                          : chiSoThaiDo > 9 && detectSpecialNumber(chiSoThaiDo)
                          ? chiSoThaiDo + "/" + convertInto1Digit(chiSoThaiDo)
                          : convertInto1Digit(chiSoThaiDo)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-br from-amber-50/95 to-amber-100/90 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-amber-500 drop-shadow-sm">
              I. Thông tin cơ bản
            </h2>
            <div className="mb-8"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Số lặp
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {soLap.length > 0
                          ? soLap.toString().split("").join("")
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Ngày sinh
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {ngaySinh1So <= 9
                          ? ngaySinh1So
                          : ngaySinh1So > 9 && detectSpecialNumber(ngaySinh1So)
                          ? ngaySinh1So + "/" + convertInto1Digit(ngaySinh1So)
                          : ngaySinh1So}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Tính cách{" "}
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {chiSoTinhCach <= 9
                          ? chiSoTinhCach
                          : chiSoTinhCach > 9 &&
                            detectSpecialNumber(chiSoTinhCach)
                          ? chiSoTinhCach +
                            "/" +
                            convertInto1Digit(chiSoTinhCach)
                          : chiSoTinhCach}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Nội tâm{" "}
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {chiSoNoiTam <= 9
                          ? chiSoNoiTam
                          : chiSoNoiTam > 9 && detectSpecialNumber(chiSoNoiTam)
                          ? chiSoNoiTam + "/" + convertInto1Digit(chiSoNoiTam)
                          : chiSoNoiTam}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 w-full">
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Danh đồ
                  </h3>
                  <div className="w-full flex justify-center items-center">
                    {fullName.length > 0 ? (
                      <table className="border-2 border-amber-400 shadow-lg">
                        <tbody>
                          <tr>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(3)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[3]
                                  )
                                )
                                  .fill("3")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(6)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[6]
                                  )
                                )
                                  .fill("6")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(9)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[9]
                                  )
                                )
                                  .fill("9")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                          <tr className=" ">
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(2)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[2]
                                  )
                                )
                                  .fill("2")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(5)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[5]
                                  )
                                )
                                  .fill("5")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(8)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[8]
                                  )
                                )
                                  .fill("8")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                          <tr className=" ">
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(1)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[1]
                                  )
                                )
                                  .fill("1")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(4)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[4]
                                  )
                                )
                                  .fill("4")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span
                                className={`${
                                  chiSoDamMeTiemAn.includes(7)
                                    ? "text-amber-700 font-bold"
                                    : "text-amber-600"
                                }`}
                              >
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInName(fullName)[7]
                                  )
                                )
                                  .fill("7")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>
                </div>
                <div className="w-full">
                  {" "}
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Sinh đồ
                  </h3>
                  <div className="w-full flex justify-center items-center">
                    {dob.length > 0 ? (
                      <table className="border-2 border-amber-400 shadow-lg">
                        <tbody>
                          <tr>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[3]
                                  )
                                )
                                  .fill("3")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[6]
                                  )
                                )
                                  .fill("6")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[9]
                                  )
                                )
                                  .fill("9")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[2]
                                  )
                                )
                                  .fill("2")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[5]
                                  )
                                )
                                  .fill("5")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[8]
                                  )
                                )
                                  .fill("8")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[1]
                                  )
                                )
                                  .fill("1")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[4]
                                  )
                                )
                                  .fill("4")
                                  .join("")}
                              </span>
                            </td>
                            <td className="border-collapse w-24 h-24 justify-center items-center text-center border-2 border-amber-400 bg-amber-50/80 text-3xl">
                              <span className="text-amber-600 font-medium">
                                {Array(
                                  Number(
                                    countNumberOfOccurenceInDateOfBirth(dob)[7]
                                  )
                                )
                                  .fill("7")
                                  .join("")}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-amber-50/95 to-amber-100/90 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-amber-700 to-amber-500 drop-shadow-sm">
              II. Nguồn lực
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-amber-800 flex justify-center items-center">
                    Thái độ
                  </h3>
                  <div className="flex items-center space-x-4 justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-md ring-2 ring-amber-200">
                      <span className="text-2xl font-bold ">
                        {chiSoThaiDo <= 9
                          ? chiSoThaiDo
                          : chiSoThaiDo > 9 && detectSpecialNumber(chiSoThaiDo)
                          ? chiSoThaiDo + "/" + convertInto1Digit(chiSoThaiDo)
                          : convertInto1Digit(chiSoThaiDo)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-amber-800 flex justify-center items-center">
                    Bản thể tiềm thức
                  </h3>
                  <div className="flex items-center space-x-4 justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-md ring-2 ring-amber-200">
                      <span className="text-2xl font-bold ">
                        {chiSoBanTheTiemThuc <= 9
                          ? chiSoBanTheTiemThuc
                          : chiSoBanTheTiemThuc > 9 &&
                            detectSpecialNumber(chiSoBanTheTiemThuc)
                          ? chiSoBanTheTiemThuc +
                            "/" +
                            convertInto1Digit(chiSoBanTheTiemThuc)
                          : convertInto1Digit(chiSoBanTheTiemThuc)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-amber-800 flex justify-center items-center">
                    Cân bằng
                  </h3>
                  <div className="flex items-center space-x-4 justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-md ring-2 ring-amber-200">
                      <span className="text-2xl font-bold">
                        {chiSoCanBang <= 9
                          ? chiSoCanBang
                          : chiSoCanBang > 9 &&
                            detectSpecialNumber(chiSoCanBang)
                          ? chiSoCanBang + "/" + convertInto1Digit(chiSoCanBang)
                          : convertInto1Digit(chiSoCanBang)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-amber-800 flex justify-center items-center">
                    Trưởng thành
                  </h3>
                  <div className="flex items-center space-x-4 justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-md ring-2 ring-amber-200">
                      <span className="text-2xl font-bold">
                        {convertInto1Digit(
                          convertInto1Digit(chiSoSuMenh) +
                            convertInto1Digit(chiSoDuongDoi)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200/50">
                <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                  Cầu nối
                </h3>
                <div className="grid grid-cols-2 w-full gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                      Đường đời - Sứ mệnh{" "}
                    </h3>
                    <div className="flex items-center space-x-4  justify-center ">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {Math.abs(
                            convertInto1Digit(chiSoDuongDoi) -
                              convertInto1Digit(chiSoSuMenh)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                      Nội tâm - Tính cách{" "}
                    </h3>
                    <div className="flex items-center space-x-4  justify-center ">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {Math.abs(
                            convertInto1Digit(chiSoNoiTam) -
                              convertInto1Digit(chiSoTinhCach)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-amber-50/95 to-amber-100/90 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-amber-200">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
              III. Dự báo tương lai
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Năm cá nhân ({new Date().getFullYear()})
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {convertInto1Digit(
                          convertInto1Digit(ngaySinh1So) +
                            convertInto1Digit(monthOfBirth) +
                            convertInto1Digit(new Date().getFullYear())
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Sứ mệnh
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {chiSoSuMenh}
                        {chiSoSuMenh > 9
                          ? "/" + convertInto1Digit(chiSoSuMenh)
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-4 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-amber-700 flex justify-center items-center">
                    Đường đời
                  </h3>
                  <div className="flex items-center space-x-4  justify-center ">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {chiSoDuongDoi}
                        {chiSoDuongDoi > 9
                          ? "/" + convertInto1Digit(chiSoDuongDoi)
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200/50">
                <NumberDiagram numbers={diagramNumbers} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
