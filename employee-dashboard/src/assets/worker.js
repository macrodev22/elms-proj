importScripts("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js")

self.addEventListener('message', async (e) => {
    const data = e.data
    // console.log('aoa', data)
    // create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data)

    // workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, worksheet, 'Report')

    // Blob
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    self.postMessage(blob)
})