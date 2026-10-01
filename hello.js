document.addEventListener('DOMContentLoaded', async () => {
  const out = document.getElementById('out');
  try {
    await tableau.extensions.initializeAsync();
    const dashboard = tableau.extensions.dashboardContent.dashboard;
    let text = 'Dashboard: ' + dashboard.name + '\nWorksheets:\n';
    dashboard.worksheets.forEach(ws => { text += ' - ' + ws.name + '\n'; });

    const grid = dashboard.worksheets.find(w => w.name === 'Orders Grid')
                 || dashboard.worksheets[0];
    const data = await grid.getSummaryDataAsync({ maxRows: 5 });
    text += '\nColumns in "' + grid.name + '": '
         + data.columns.map(c => c.fieldName).join(', ');
    text += '\nRows returned: ' + data.data.length;
    out.textContent = text;
  } catch (e) {
    out.textContent = 'Error: ' + e.message;
  }
});
