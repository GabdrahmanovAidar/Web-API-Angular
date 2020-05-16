﻿using DAL;
using DAL.Entities;
using Interfaces;
using Interfaces.Contexts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL.Commands.Lesson
{
    public class LessonCreateCommand : CreateMediaBase, ICommand<LessonCreateContext>
    {
        private readonly EfContext _db;

        public LessonCreateCommand(EfContext db) : base(db)
        {
            _db = db;
        }


        public async Task<CommandResult> ExecuteAsync(LessonCreateContext context)
        {

            using (var transaction = await _db.Database.BeginTransactionAsync())
            {
                

                _db.Lessons.Add(context.Lesson);
                await _db.SaveChangesAsync();
                await CreateVideos(context.Videos, context.Lesson.Id);
                transaction.Commit();
            }
            return CommandResult.Success();
        }
    }
}
