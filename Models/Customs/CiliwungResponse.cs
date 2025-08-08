using System.Text.Json.Serialization;

public class CiliwungResponse
{
    public string id { get; set; }
    public string name { get; set; }
    public string type { get; set; }
    public int? sequence_station { get; set; }
    public string device_id { get; set; }
    public string brand_name { get; set; }
    public string river_area_name { get; set; }
    public string river_area_id { get; set; }
    public string watershed_name { get; set; }
    public string watershed_id { get; set; }
    public double latitude { get; set; }
    public double longitude { get; set; }
    public string province_name { get; set; }
    public string regency_name { get; set; }
    public string district_name { get; set; }
    public string village_name { get; set; }

    // Properties untuk ARR
    public double? rainfall { get; set; }
    public string? reading_hour { get; set; }
    public double? rainfall_hour { get; set; }
    public string intensity_hour { get; set; }
    public double? rainfall_min { get; set; }
    public double? rainfall_max { get; set; }

    // Properties untuk AWLR
    public string unit_display { get; set; }
    public double? siaga1 { get; set; }
    public double? siaga2 { get; set; }
    public double? siaga3 { get; set; }
    public double? water_level { get; set; }
    public double? water_level_elevation { get; set; }
    public double? debit { get; set; }
    public double? change_value { get; set; }
    public string change_status { get; set; }
    public string warning_status { get; set; }
    public double? water_level_min { get; set; }
    public double? water_level_max { get; set; }

    // Common properties
    public double? battery { get; set; }
    public string? reading_at { get; set; }
    public string status { get; set; }

    [Newtonsoft.Json.JsonIgnore]
    public DateTime? ReadingAtDateTime
    {
        get
        {
            if (DateTime.TryParse(reading_at, out DateTime result))
                return result;
            return null;
        }
    }
    
    [Newtonsoft.Json.JsonIgnore]
    public DateTime? ReadingHourDateTime
    {
        get
        {
            if (DateTime.TryParse(reading_hour, out DateTime result))
                return result;
            return null;
        }
    }
}