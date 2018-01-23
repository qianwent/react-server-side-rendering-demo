/**
 * Created by kin on 15/9/29.
 */
import Request from 'superagent';
class DemoService {

    static loadData(payload, done) {
        var req = Request
            .get("http://127.0.0.1:4011/api/data");
        if (payload.req) {
            req.set("Cookie", payload.req.headers.cookie || "");
        }
        req.query(payload.form)
            .end(function (err, res) {
                var result = res.body;
                done && done(result, done);
            });
    }


}
export default DemoService;