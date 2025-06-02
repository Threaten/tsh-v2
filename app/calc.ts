interface Props {
  fullName: string;
  dateOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
}

let soNgay = 0;
let soThang = 0;
let soNam = 0;

const characterToNumber = (character: string) => {
  if (character == "a" || character == "j" || character == "s") {
    return 1;
  } else if (character == "b" || character == "k" || character == "t") {
    return 2;
  } else if (character == "c" || character == "l" || character == "u") {
    return 3;
  } else if (character == "d" || character == "m" || character == "v") {
    return 4;
  } else if (character == "e" || character == "n" || character == "w") {
    return 5;
  } else if (character == "f" || character == "o" || character == "x") {
    return 6;
  } else if (character == "g" || character == "p" || character == "y") {
    return 7;
  } else if (character == "h" || character == "q" || character == "z") {
    return 8;
  } else if (character == "i" || character == "r") {
    return 9;
  }
};

const vowelCheck = (name: string) => {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const loweredName = name.toLowerCase();
  const vowelList = [];
  const consonantList = [];

  for (let i = 0; i < loweredName.length; i++) {
    if (vowels.has(loweredName[i])) {
      vowelList.push(loweredName[i]);
    } else if (loweredName[i] === "y") {
      // Check if either neighboring letter is a vowel
      const prevIsVowel = i > 0 && vowels.has(loweredName[i - 1]);
      const nextIsVowel =
        i < loweredName.length - 1 && vowels.has(loweredName[i + 1]);
      if (prevIsVowel || nextIsVowel) {
        consonantList.push(loweredName[i]); // y is a consonant if next to vowel
      } else {
        vowelList.push(loweredName[i]); // y is a vowel if not next to vowel
      }
    } else {
      if (loweredName[i] === " ") {
        continue;
      }
      consonantList.push(loweredName[i]);
    }
  }

  return { vowelList, consonantList };
};

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
      return result;
    } else {
      result = String(result)
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
  }

  return result;
};

const detectTheFirstVowelInName = (name: string) => {
  const loweredName = name.toLowerCase();
  const words = loweredName.split(" ");
  const lastWord = words[words.length - 1];
  const { vowelList } = vowelCheck(lastWord);
  const firstVowel = vowelList[0];
  return characterToNumber(firstVowel) || 0;
};

const firstCharacterInName = (name: string) => {
  const loweredName = name.toLowerCase();
  const words = loweredName.split(" ");
  const lastWord = words[words.length - 1];
  const firstChar = lastWord.charAt(0);
  return characterToNumber(firstChar) || 0;
};

const lastCharacterInName = (name: string) => {
  const loweredName = name.toLowerCase();
  const words = loweredName.split(" ");
  const lastWord = words[words.length - 1];
  const lastChar = lastWord.charAt(lastWord.length - 1);
  return characterToNumber(lastChar) || 0;
};

const timSoThieuVaSoYeu = (props: Props) => {
  const numbersInName = new Set<number>();
  const name_lower = props.fullName.toLowerCase().replace(/\s/g, "");
  const dobDigits = new Set(
    [...props.dateOfBirth, ...props.monthOfBirth, ...props.yearOfBirth].map(
      Number
    )
  );

  // Convert name characters to numbers
  for (const char of name_lower) {
    const num = characterToNumber(char);
    if (num) numbersInName.add(num);
  }

  const soThieu: number[] = [];
  const soYeu: number[] = [];
  const count = numbersInName.size;

  // Check numbers 1-9
  for (let i = 1; i <= 9; i++) {
    if (!numbersInName.has(i)) {
      if (dobDigits.has(i)) {
        soThieu.push(i);
      } else {
        soYeu.push(i);
      }
    }
  }

  return { soThieu, soYeu, count };
};

const chiSoPhuongTienNhanThucTinhThan = (name: string) => {
  const name_lower = name.toLowerCase();
  let sum = 0;
  const targetChars = new Set(["a", "n", "h", "p", "j", "g", "l"]);

  for (const char of name_lower) {
    if (targetChars.has(char)) {
      const num = characterToNumber(char);
      if (num) sum += num;
    }
  }
  //   console.log(
  //     "Chi so phuong tien nhan thuc tinh than:",
  //     convertInto1Digit(sum)
  //   );

  return convertInto1Digit(sum);
};

const chiSoPhuongTienNhanThucTrucGiac = (name: string) => {
  const name_lower = name.toLowerCase();
  let sum = 0;
  const targetChars = new Set(["k", "f", "c", "v", "q", "u", "y"]);

  for (const char of name_lower) {
    if (targetChars.has(char)) {
      const num = characterToNumber(char);
      if (num) sum += num;
    }
  }

  //   console.log(
  //     "Chi so phuong tien nhan thuc truc giac:",
  //     convertInto1Digit(sum)
  //   );

  return convertInto1Digit(sum);
};

const chiSoPhuongTienNhanThucCamXuc = (name: string) => {
  const name_lower = name.toLowerCase();
  let sum = 0;
  const targetChars = new Set(["s", "o", "i", "r", "z", "b", "t", "x"]);

  for (const char of name_lower) {
    if (targetChars.has(char)) {
      const num = characterToNumber(char);
      if (num) sum += num;
    }
  }
  //   console.log("Chi so phuong tien nhan thuc cam xuc:", convertInto1Digit(sum));

  return convertInto1Digit(sum);
};

const chiSoPhuongTienNhanThucTheChat = (name: string) => {
  const name_lower = name.toLowerCase();
  let sum = 0;
  const targetChars = new Set(["e", "m", "w", "d"]);

  for (const char of name_lower) {
    if (targetChars.has(char)) {
      const num = characterToNumber(char);
      if (num) sum += num;
    }
  }
  //   console.log("Chi so phuong tien nhan thuc the chat:", convertInto1Digit(sum));

  return convertInto1Digit(sum);
};

const chiSoCanBang = (name: string) => {
  const name_lower = name.toLowerCase();
  const words = name_lower.split(" ");
  let selectedWords = [];

  if (words.length <= 3) {
    selectedWords = words;
  } else {
    selectedWords = [words[0], words[1], words[words.length - 1]];
  }

  let sum = 0;
  for (const word of selectedWords) {
    const firstChar = word.charAt(0);
    const num = characterToNumber(firstChar);
    if (num) sum += num;
  }
  //   console.log("Chi so can bang:", convertInto1Digit(sum));

  return convertInto1Digit(sum);
};

const tinhSoNgay = (date: string) => {
  let tongNgaySinh = 0;
  soNgay = 0;

  for (let i = 0; i < date.length; i++) {
    tongNgaySinh += parseInt(date[i]);
  }
  //   console.log("songay", convertInto1DigitKeepSpecialNumber(tongNgaySinh));

  return convertInto1DigitKeepSpecialNumber(tongNgaySinh);
};

const tinhSoThang = (month: string) => {
  let tongThangSinh = 0;
  soThang = 0;

  for (let i = 0; i < month.length; i++) {
    tongThangSinh += parseInt(month[i]);
  }
  console.log("sothang", convertInto1DigitKeepSpecialNumber(tongThangSinh));

  return convertInto1DigitKeepSpecialNumber(tongThangSinh);
};

const tinhSoNam = (year: string) => {
  let tongNamSinh = 0;
  soNam = 0;

  for (let i = 0; i < year.length; i++) {
    tongNamSinh += parseInt(year[i]);
  }
  //   console.log("sonam", convertInto1DigitKeepSpecialNumber(tongNamSinh));

  return convertInto1DigitKeepSpecialNumber(tongNamSinh);
};

export const tinhChiSoDuongDoi = (props: Props) => {
  const tongNgayThangNamSinh =
    tinhSoNgay(props.dateOfBirth) +
    tinhSoThang(props.monthOfBirth) +
    tinhSoNam(props.yearOfBirth);
  //   console.log(
  //     "chisoduongdoi",
  //     convertInto1DigitKeepSpecialNumber(tongNgayThangNamSinh)
  //   );

  return convertInto1DigitKeepSpecialNumber(tongNgayThangNamSinh);
};

export const tinhChiSoTinhCach = (props: Props) => {
  const words = props.fullName.split(" "); // Split full name into words
  let tongPhuAm = 0;

  words.forEach((word) => {
    let tongPhuAmTungTu = 0;
    const consonantList = vowelCheck(word).consonantList;

    // Calculate sum for each word
    consonantList.forEach((element) => {
      const value = characterToNumber(element);
      if (value) tongPhuAmTungTu += value;
    });

    // Reduce to single digit unless it's a master number

    // Add to total sum
    tongPhuAm += convertInto1DigitKeepSpecialNumber(tongPhuAmTungTu);
  });

  // Calculate final result
  //   console.log("chisotinhcach", convertInto1DigitKeepSpecialNumber(tongPhuAm));
  return convertInto1DigitKeepSpecialNumber(tongPhuAm);
};

export const tinhChiSoNoiTam = (props: Props) => {
  const words = props.fullName.split(" ");
  let tongNguyenAm = 0;

  words.forEach((word) => {
    let tongNguyenAmTungTu = 0;
    const vowelList = vowelCheck(word).vowelList;

    vowelList.forEach((element) => {
      const value = characterToNumber(element);
      if (value) tongNguyenAmTungTu += value;
    });

    tongNguyenAm += convertInto1DigitKeepSpecialNumber(tongNguyenAmTungTu);
  });
  //   console.log("chisonoitam", convertInto1DigitKeepSpecialNumber(tongNguyenAm));

  return convertInto1DigitKeepSpecialNumber(tongNguyenAm);
};

export const tinhChiSoDamMeTiemAn = (props: Props) => {
  const name_lower = props.fullName.toLowerCase().replace(/\s/g, "");
  const counts = new Map<number, number>();

  // Convert letters to numbers and count occurrences
  for (const char of name_lower) {
    const num = characterToNumber(char);
    if (num) {
      counts.set(num, (counts.get(num) || 0) + 1);
    }
  }

  // Find max frequency
  const maxCount = Math.max(...counts.values());

  // Get all numbers that appear most frequently
  const results: number[] = [];
  if (maxCount > 1) {
    for (const [num, count] of counts.entries()) {
      if (count === maxCount) {
        results.push(num);
      }
    }
  }
  //   console.log("chisodamme", results);

  return results;
};

export const tinhChiSoNguyenAmDauTrongTen = (props: Props) => {
  const firstVowel = detectTheFirstVowelInName(props.fullName);
  return firstVowel;
};

export const tinhChuDauTrongTen = (props: Props) => {
  const firstChar = firstCharacterInName(props.fullName);
  return firstChar;
};

export const tinhChuCuoiTrongTen = (props: Props) => {
  const lastChar = lastCharacterInName(props.fullName);
  return lastChar;
};

export const tinhChiSoThaiDo = (props: Props) => {
  //   console.log(
  //     "so ngay " +
  //       tinhSoNgay(props.dateOfBirth) +
  //       "+ so thang" +
  //       tinhSoThang(props.monthOfBirth)
  //   );

  return tinhSoNgay(props.dateOfBirth) + tinhSoThang(props.monthOfBirth);
};

export const tinhChiSoBanTheTiemThuc = (props: Props) => {
  const result = timSoThieuVaSoYeu(props);

  return 9 - result.soThieu.length - result.soYeu.length;
};

export const tinhChiSoPhuongTienNhanThucTinhThan = (props: Props) => {
  return chiSoPhuongTienNhanThucTinhThan(props.fullName);
};

export const tinhChiSoPhuongTienNhanThucTrucGiac = (props: Props) => {
  return chiSoPhuongTienNhanThucTrucGiac(props.fullName);
};

export const tinhChiSoPhuongTienNhanThucCamXuc = (props: Props) => {
  return chiSoPhuongTienNhanThucCamXuc(props.fullName);
};

export const tinhChiSoPhuongTienNhanThucTheChat = (props: Props) => {
  return chiSoPhuongTienNhanThucTheChat(props.fullName);
};

export const tinhChiSoCanBang = (props: Props) => {
  return chiSoCanBang(props.fullName);
};

export const tinhChiSoThieu = (props: Props) => {
  return timSoThieuVaSoYeu(props).soThieu;
};

export const tinhChiSoYeu = (props: Props) => {
  return timSoThieuVaSoYeu(props).soYeu;
};

export const tinhChiSoSuMenh = (props: Props) => {
  const words = props.fullName.split(" ");
  let tongChiSoSum = 0;

  words.forEach((word) => {
    let wordSum = 0;
    const loweredWord = word.toLowerCase();

    for (const char of loweredWord) {
      const value = characterToNumber(char);
      if (value) wordSum += value;
    }

    tongChiSoSum += convertInto1Digit(wordSum);
  });
  //   console.log("chisosumenh", convertInto1DigitKeepSpecialNumber(tongChiSoSum));

  return convertInto1DigitKeepSpecialNumber(tongChiSoSum);
};

export const countNumberOfOccurenceInName = (fullName: string) => {
  const result: { [key: string]: number } = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  };

  const name_lower = fullName.toLowerCase().replace(/\s/g, "");
  for (const char of name_lower) {
    const num = characterToNumber(char);
    if (num) {
      result[num.toString()]++;
    }
  }

  return result;
};

export const countNumberOfOccurenceInDateOfBirth = (dateOfBirth: string) => {
  const result: { [key: string]: number } = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  };

  for (const char of dateOfBirth) {
    const num = parseInt(char);
    if (!isNaN(num)) {
      result[num.toString()]++;
    }
  }

  return result;
};

export const tinhNgaySinh1So = (props: Props) => {
  const date = tinhSoNgay(props.dateOfBirth);
  const month = tinhSoThang(props.monthOfBirth);
  const year = tinhSoNam(props.yearOfBirth);

  return {
    date,
    month,
    year,
  };
};

export const timSoLap = (props: Props) => {
  const chiSoDuongDoi = convertInto1Digit(tinhChiSoDuongDoi(props));
  const chiSoNgaySinh = convertInto1Digit(tinhNgaySinh1So(props).date);
  const chiSoTinhCach = convertInto1Digit(tinhChiSoTinhCach(props));
  const chiSoNoiTam = convertInto1Digit(tinhChiSoNoiTam(props));
  const chiSoThaiDo = convertInto1Digit(tinhChiSoThaiDo(props));
  const chisosumenh = convertInto1Digit(tinhChiSoSuMenh(props));

  const numbers = [
    chiSoDuongDoi,
    chiSoNgaySinh,
    chiSoTinhCach,
    chiSoNoiTam,
    chiSoThaiDo,
    chisosumenh,
  ];

  const counts = new Map<number, number>();
  const duplicates: number[] = [];

  // Count occurrences
  for (const num of numbers) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // Find max frequency
  let maxFreq = 0;
  for (const count of counts.values()) {
    if (count > maxFreq) maxFreq = count;
  }

  // Get numbers that appear most frequently
  if (maxFreq > 1) {
    for (const [num, count] of counts.entries()) {
      if (count === maxFreq) {
        duplicates.push(num);
      }
    }
  }

  //   console.log("Chi so lap:", duplicates);

  return duplicates;
};
