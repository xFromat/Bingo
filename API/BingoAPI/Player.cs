using System.ComponentModel.DataAnnotations;

namespace BingoAPI
{
    public class Player
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string Name { get; set; } = string.Empty;

        public int Points { get; set; }
        public int Position { get; set; }

        public int GameId { get; set; }

        public Game? Game { get; set; }
    }
}
