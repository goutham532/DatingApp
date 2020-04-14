using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public List<ModelCls.values> Get()
        {
            SqlConnection sql = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB; Integrated Security=True; MultipleActiveResultSets=True");
            sql.Open();
            SqlCommand cmd = new SqlCommand("select username,pwd from Sairaj.dbo.userDetails", sql);
            SqlDataReader reader = cmd.ExecuteReader();
            List<ModelCls.values> obj=new List<ModelCls.values>();
                while (reader.Read())
                {
                    ModelCls.values val=new ModelCls.values();
                   val.id=reader[1].ToString();
                   val.name=reader[0].ToString();
                   obj.Add(val);
                }
            return obj;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
