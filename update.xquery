declare option output:method "json";
let $page := doc("https://en.wikipedia.org/wiki/Mobile_country_code")
return
<json type="array">
{
  

for $h4 in $page//div[@id="bodyContent"]//h4
  let $country-code := $h4/span[@id]/text()[last()]
  let $rows := head($h4/following::table)/tr[td]
  for $row in $rows
  return <_ type="object">
    <country>{replace($country-code, '.*- (.*)$', '$1')}</country>
    <mcc>{$row/td[1]/text()}</mcc>
    <mnc>{$row/td[2]/text()}</mnc>
    <carrier>{$row/td[3]/data()}</carrier>
    <company>{$row/td[4]/data()}</company>
  </_>
  
}
</json>