import ExcelJS from 'exceljs'
import { studyYearResultOptions, unitRankOptions } from 'src/helpers/constants'

const downloadExcelFile = async (workbook, filename) => {
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}

const getMassAttendancePercentage = (attendances) => {
  return Math.round((attendances.mass_total_present / attendances.mass_total) * 100)
}

const getLessonAttendancePercentage = (attendances) => {
  return Math.round((attendances.lesson_total_present / attendances.lesson_total) * 100)
}

const populateYearEndSummaryWorksheet = (worksheet, unitDetails, unitYearEndData) => {
  worksheet.getCell('B2').value = unitDetails.code
  worksheet.getCell('B3').value = unitDetails.name

  // Populate student data starting from row 5
  unitYearEndData.forEach((student, index) => {
    const row = index + 5 // Row 5 is where data starts
    worksheet.getCell(`A${row}`).value = index + 1
    worksheet.getCell(`B${row}`).value = student.code
    worksheet.getCell(`C${row}`).value = student.saint_name
    worksheet.getCell(`D${row}`).value = `${student.last_name} ${student.middle_name}`.trim()
    worksheet.getCell(`E${row}`).value = student.first_name
    worksheet.getCell(`F${row}`).value = Number(student.exam_scores.final_average || 0)
    worksheet.getCell(`G${row}`).value = getMassAttendancePercentage(student.attendances)
    worksheet.getCell(`H${row}`).value = getLessonAttendancePercentage(student.attendances)
    const resultOption = studyYearResultOptions.find(
      (option) => option.value === student.year_end_result.result,
    )
    worksheet.getCell(`I${row}`).value = resultOption ? resultOption.label : ''
    worksheet.getCell(`J${row}`).value = student.year_end_result.remark
    worksheet.getCell(`K${row}`).value = student.year_end_result.notes

    const cellsToApplyFormat = [
      `A${row}`,
      `B${row}`,
      `C${row}`,
      `D${row}`,
      `E${row}`,
      `F${row}`,
      `G${row}`,
      `H${row}`,
      `I${row}`,
      `J${row}`,
      `K${row}`,
    ]

    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cellsToApplyFormat.forEach((cell) => {
      worksheet.getCell(cell).border = borderStyle
    })

    if (student.year_end_result.result === 'failed') {
      cellsToApplyFormat.forEach((cell) => {
        worksheet.getCell(cell).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFB5B5' },
        }
      })
    }
  })
}

const populateAwardListWorksheet = (worksheet, unitDetails, unitYearEndData) => {
  const rankOrder = ['first', 'second', 'third', 'encouragement', null]
  // get award list data from unitYearEndData
  const awaredStudents = unitYearEndData.filter((student) => student.year_end_result.unit_ranking)
  awaredStudents.sort((a, b) => {
    return (
      rankOrder.indexOf(a.year_end_result.unit_ranking) -
      rankOrder.indexOf(b.year_end_result.unit_ranking)
    )
  })

  worksheet.getCell('B2').value = unitDetails.code
  worksheet.getCell('B3').value = unitDetails.name

  // Populate student data starting from row 5
  awaredStudents.forEach((student, index) => {
    const row = index + 5 // Row 5 is where data starts
    worksheet.getCell(`A${row}`).value = index + 1
    worksheet.getCell(`B${row}`).value = student.code
    worksheet.getCell(`C${row}`).value = student.saint_name
    worksheet.getCell(`D${row}`).value = `${student.last_name} ${student.middle_name}`.trim()
    worksheet.getCell(`E${row}`).value = student.first_name
    const rankOption = unitRankOptions.find(
      (option) => option.value === student.year_end_result.unit_ranking,
    )
    worksheet.getCell(`F${row}`).value = rankOption ? rankOption.label : ''

    const cellsToApplyFormat = [`A${row}`, `B${row}`, `C${row}`, `D${row}`, `E${row}`, `F${row}`]

    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cellsToApplyFormat.forEach((cell) => {
      worksheet.getCell(cell).border = borderStyle
    })
  })
}

const exportYearEndSummaryToExcel = async (unitDetails, unitYearEndData) => {
  // unit year end data should already be sorted by first name
  const yearEndTemplate = await fetch(
    `/exportTemplates/YearEndSummaryTemplate.xlsx?t=${Date.now()}`,
  )
  const arrayBuffer = await yearEndTemplate.arrayBuffer()

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(arrayBuffer)
  const summaryWorksheet = workbook.getWorksheet('Tổng kết cuối năm')
  const awardWorksheet = workbook.getWorksheet('Danh sách khen thưởng')

  await populateYearEndSummaryWorksheet(summaryWorksheet, unitDetails, unitYearEndData)
  await populateAwardListWorksheet(awardWorksheet, unitDetails, unitYearEndData)

  await downloadExcelFile(workbook, `Tổng kết cuối năm - ${unitDetails.code}.xlsx`)
}

export { exportYearEndSummaryToExcel }
