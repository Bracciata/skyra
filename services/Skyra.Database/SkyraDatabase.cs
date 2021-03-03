﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Skyra.Database.Extensions;
using Skyra.Database.Models;
using Skyra.Database.Models.Entities;

namespace Skyra.Database
{
	public class SkyraDatabase : IDatabase, IDisposable
	{
		private readonly SkyraDbContext _context;

		public SkyraDatabase(SkyraDbContext context)
		{
			_context = context;
		}

		public async Task<PointsQuery> AddUserPointsAsync(string userId, int points)
		{
			try
			{
				var user = await _context.Users.UpsertAsync(userId, () => new User {Id = userId, Points = 0});

				user.Points += points;

				await _context.SaveChangesAsync();

				return new PointsQuery
				{
					Success = true,
					Points = user.Points
				};
			}
			catch (Exception e)
			{
				return new PointsQuery
				{
					Success = false,
					FailureReason = e.ToString()
				};
			}
		}

		public async Task<PointsQuery> GetUserPointsAsync(string userId)
		{
			try
			{
				var user = await _context.Users.FindAsync(userId);
				return new PointsQuery
				{
					Points = user?.Points ?? 0,
					Success = true
				};
			}
			catch (Exception e)
			{
				return new PointsQuery
				{
					Success = false,
					FailureReason = e.ToString()
				};
			}
		}

		public void Dispose()
		{
			_context.Dispose();
		}
	}
}