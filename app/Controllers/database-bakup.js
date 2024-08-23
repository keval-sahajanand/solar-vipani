const knex = require('../../common/knex.config')()
const csvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path =require('path');

function databaseBackupController() {

  return {
    async dataTableBackUp(req,res){
      try {
        const { tableName } = req.params;
        let rows = await knex(tableName).select('*');
        if(tableName == "users"){
           rows = await knex(tableName).select('*').where("type","subAdmin");
        }
        
        const paths=path.join(__dirname,'../../public/csv')
        const csvWriterInstance = csvWriter({
          path: `${paths}/${tableName}.csv`,
          header: Object.keys(rows[0]).map(key => ({ id: key, title: key }))
        });
    
        await csvWriterInstance.writeRecords(rows);
    
        // res.download(`${tableName}.csv`, `${tableName}.csv`, (err) => {
        //   if (err) {
        //     console.error(err);
        //     res.status(500).send('Internal server error');
        //   }
        // });
    
        return res.json({
          res:true,
          msg:'Success',
          data:{
            url:`${tableName}.csv`
          }
        })

        // Cleanup: remove the generated CSV file after download
        // fs.unlinkSync(`${paths}/${tableName}.csv`);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
    }
  }
  
}
module.exports = databaseBackupController